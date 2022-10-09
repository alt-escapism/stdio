import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { getDb } from "../db";
import { BatchRenderer } from "./batch-renderer";
import { ImagePreview } from "./image-preview";

export const BATCH_PREVIEW_SIZE = 280;

const styles = css`
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
    <div className={styles}>
      <BatchRenderer batchId={batchId} />
      {imagesMeta?.map((imageMeta) => (
        <ImagePreview key={imageMeta.id} imageMeta={imageMeta} />
      ))}
    </div>
  );
}
