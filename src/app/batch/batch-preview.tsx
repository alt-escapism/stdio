import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { useSnapshot } from "valtio";
import { getDb } from "../db";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { NavigationBackButton } from "../navigation-back-buttons";
import { settings } from "../settings-state";
import { BatchRenderer } from "./batch-renderer";
import { formatBatchDate } from "./batch-summary-row";
import { ImagePreview } from "./image-preview";

export const BATCH_PREVIEW_SIZE = 280;

const imageGridStyles = css`
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;

  > * {
    height: ${BATCH_PREVIEW_SIZE}px;
    overflow: hidden;
    width: ${BATCH_PREVIEW_SIZE}px;
  }
`;

export function BatchPreview({ batchId }: { batchId: string }) {
  const imagesMeta = useLiveQuery(() =>
    getDb()
      .ImageMeta.where("batchId")
      .equals(batchId)
      .reverse()
      .sortBy("createdAt")
  );

  return (
    <Pane
      header={
        <Spacer>
          <NavigationBackButton />
          <BatchTitle batchId={batchId} />
        </Spacer>
      }
      main={
        <div className={imageGridStyles}>
          <BatchRenderer batchId={batchId} />
          {imagesMeta?.map((imageMeta) => (
            <ImagePreview key={imageMeta.id} imageMeta={imageMeta} />
          ))}
        </div>
      }
    />
  );
}

const batchTitleStyles = css`
  color: #aaa;
  display: flex;
  gap: 24px;

  > :first-child {
    color: white;
  }
`;

function BatchTitle({ batchId }: { batchId: string }) {
  const batch = useSnapshot(settings).batches[batchId];

  if (!batch) return null;

  return batch.done < batch.total ? (
    <span>
      Generating {batch.done + 1} of {batch.total}...
    </span>
  ) : (
    <span className={batchTitleStyles}>
      <span>Batch of {batch.total}</span>
      <span>Started {formatBatchDate(new Date(batch.createdAt))}</span>
      <span>
        {batch.windowWidth}x{batch.windowHeight}
      </span>
    </span>
  );
}
