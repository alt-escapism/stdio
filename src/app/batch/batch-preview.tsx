import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Frame } from "../frame/frame";
import { settings } from "../settings-state";

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

export function BatchPreview({ id }: { id: string }) {
  const _settings = useSnapshot(settings);
  const batch = _settings.batches[id];

  if (!batch) {
    return null;
  }

  return (
    <div className={styles}>
      <div>
        <Frame
          id="batch"
          variables={batch.variables}
          windowSize={[batch.windowWidth, batch.windowHeight]}
          scaledSize={[BATCH_PREVIEW_SIZE, BATCH_PREVIEW_SIZE]}
        />
      </div>
    </div>
  );
}
