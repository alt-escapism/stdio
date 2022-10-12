import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { getDb } from "../db";
import { ButtonGroup } from "../generic-ui/button";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { popScreen, pushScreen } from "../navigation";
import { NavigationBackButton } from "../navigation-back-buttons";
import { BatchRenderer } from "./batch-renderer";
import { formatBatchDate } from "./batch-summary-row";
import { DeleteBatchButton } from "./delete-batch-button";
import { ImagePreview } from "./image-preview";

export const BATCH_PREVIEW_SIZE = 280;

const imageGridStyles = css`
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;

  > * {
    border: 2px solid transparent;
    height: ${BATCH_PREVIEW_SIZE}px;
    overflow: hidden;
    width: ${BATCH_PREVIEW_SIZE}px;

    :hover {
      border-color: white;
    }
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
        <>
          <Spacer>
            <NavigationBackButton />
            <BatchTitle batchId={batchId} />
          </Spacer>
          <ButtonGroup>
            <DeleteBatchButton
              batchId={batchId}
              onSuccess={() => popScreen(["batch", batchId])}
            />
          </ButtonGroup>
        </>
      }
      main={
        <div className={imageGridStyles}>
          <BatchRenderer batchId={batchId} />
          {imagesMeta?.map((imageMeta) => (
            <ImagePreview
              key={imageMeta.id}
              imageId={imageMeta.id}
              onClick={() => {
                pushScreen(["image", imageMeta.id]);
              }}
            />
          ))}
        </div>
      }
    />
  );
}

const batchTitleStyles = css`
  color: #aaa;
  display: flex;
  font-size: 17px;
  gap: 24px;

  > :first-child {
    color: white;
    font-size: 18px;
  }

  > :nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding-left: 24px;
  }
`;

function BatchTitle({ batchId }: { batchId: string }) {
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  if (!batch) return null;

  return (
    <div className={batchTitleStyles}>
      <span>
        {batch.rendered < batch.total
          ? `Generating ${batch.rendered + 1} of ${batch.total}...`
          : `Batch of ${batch.total}`}
      </span>
      <span>
        {batch.windowWidth}x{batch.windowHeight}
      </span>
      <span>Started {formatBatchDate(new Date(batch.createdAt))}</span>
    </div>
  );
}
