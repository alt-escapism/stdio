import { css } from "@emotion/css";
import { BatchRenderer } from "./batch-renderer";

export const BATCH_PREVIEW_SIZE = 280;

const styles = css`
  display: flex;
  gap: 16px;
  padding: 16px;

  > * {
    height: ${BATCH_PREVIEW_SIZE}px;
    overflow: hidden;
    width: ${BATCH_PREVIEW_SIZE}px;
  }
`;

export function BatchPreview({ batchId }: { batchId: string }) {
  return (
    <div className={styles}>
      <BatchRenderer batchId={batchId} />
    </div>
  );
}
