import { RiFolderDownloadLine } from "react-icons/ri";
import { downloadBlob } from "../capture";
import { DbObject, getDb } from "../db";
import { Button } from "../generic-ui/button";
import { Dialog } from "../generic-ui/dialog";
import { ProgressBar } from "../generic-ui/progress-bar";
import { popScreen, pushScreen } from "../navigation";
import { proxy, useSnapshot } from "valtio";
import { VariableSnapshots } from "../../inject/variable-def.type";

export function SaveBatchButton({ batchId }: { batchId: string }) {
  return (
    <Button
      tip="Save batch"
      onClick={() => {
        const promise = saveBatch(batchId);
        pushScreen(["dialog", <SaveBatchDialog batchId={batchId} />]);
        promise.then(() => {
          popScreen();
        });
      }}
    >
      <RiFolderDownloadLine />
    </Button>
  );
}

const saveState = proxy<
  Record<string, { progress: number; completed: boolean; abort?: () => void }>
>({});

async function saveBatch(batchId: string) {
  if (saveState[batchId]) {
    return;
  }

  // Get files to add to zip, while tracking progress
  saveState[batchId] = { progress: 0, completed: false };
  const generator = getFiles(
    batchId,
    (progress) => {
      saveState[batchId].progress = progress;
    },
    () => {
      saveState[batchId].completed = true;
    }
  );
  saveState[batchId].abort = () => {
    generator.return();
  };

  // Create zip
  const { downloadZip } = await import("client-zip");
  const blob = await downloadZip(generator).blob();

  // Check we completed successfully, rather than aborted
  if (saveState[batchId].completed) {
    downloadBlob(blob, `batch-${batchId}`, "zip");
  }

  delete saveState[batchId];
}

function SaveBatchDialog({ batchId }: { batchId: string }) {
  const progress = useSnapshot(saveState)[batchId]?.progress ?? 1;

  return (
    <Dialog
      header="Generating zip..."
      body={<ProgressBar progress={progress} />}
      actions={[
        {
          children: "Cancel",
          onClick: () => {
            saveState[batchId]?.abort?.();
          },
        },
      ]}
    />
  );
}

async function* getFiles(
  batchId: string,
  updateProgress: (progress: number) => void,
  onComplete: () => void
) {
  const db = getDb();
  const batch = await db.Batch.get(batchId);
  if (!batch) return;
  const imagesMeta = await db.ImageMeta.where("batchId")
    .equals(batchId)
    .reverse()
    .sortBy("createdAt");

  // Generate batch metadata file
  yield {
    name: "_batch.json",
    input: JSON.stringify(
      {
        id: batch.id,
        createdAt: batch.createdAt,
        iterations: batch.total,
        windowWidth: batch.windowWidth,
        windowHeight: batch.windowHeight,
        variables: getVariablesValues(batch.variables),
      },
      null,
      2
    ),
  };

  // Generate variables csv file
  const csv = getCsvOfVariableValues(imagesMeta);
  yield {
    name: "_variables.csv",
    input: new Blob([csv], { type: "text/csv;charset=utf-8;" }),
  };

  // Add images
  for (let index in imagesMeta) {
    const imageMeta = imagesMeta[index];
    const image = await db.Image.get(imageMeta.id);
    const iteration = Number(index) + 1;
    if (image) {
      yield {
        name: `${iteration}.jpeg`,
        input: image.image,
      };
      updateProgress(iteration / batch.total);
    }
  }

  onComplete();
}

function getVariablesValues(variables: VariableSnapshots) {
  return Object.fromEntries(
    Object.entries(variables).map(([key, variable]) => [key, variable.value])
  );
}

function prepareForCsv(value: unknown): string {
  if (value === undefined) return "";
  const escaped = String(value).replaceAll('"', '""');
  return `"${escaped}"`;
}

function getCsvOfVariableValues(imagesMeta: DbObject["ImageMeta"][]) {
  const variableNames = new Set<string>();
  imagesMeta.forEach((meta) => {
    Object.keys(meta.variables).forEach((name) => {
      variableNames.add(name);
    });
  });
  const iterationColumnName = "#";
  const variableColumns = Array.from(variableNames);
  let csv = [iterationColumnName, ...variableColumns]
    .map(prepareForCsv)
    .join(",");
  imagesMeta.forEach((meta, index) => {
    const iteration = index + 1;
    csv +=
      "\r\n" +
      iteration +
      "," +
      variableColumns
        .map((name) => prepareForCsv(meta.variables[name]?.value))
        .join(",");
  });
  return csv;
}
