import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { subscribeKey } from "valtio/utils";
import { captureImage } from "../capture";
import { getDb } from "../db";
import { Frame } from "../frame/frame";
import {
  requireFrame,
  resetFrame,
  getVariableSnapshots,
} from "../frames-state";
import { BATCH_PREVIEW_SIZE } from "./batch-preview";
import { saveImageInDb } from "./image-db";

export function BatchRenderer({
  batchId,
  frameId = "batch",
}: {
  batchId: string;
  frameId?: string;
}) {
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  useEffect(() => {
    return subscribeKey(requireFrame(frameId), "durationMs", () => {
      if (requireFrame(frameId).durationMs != null) {
        // Done rendering
        captureImage(frameId).then((blob) => {
          if (blob) {
            saveImageInDb({
              batchId,
              image: blob,
              variables: getVariableSnapshots(frameId),
            });
            resetFrame(frameId);
            getDb().Batch.update(batchId, { rendered: batch!.rendered + 1 });
          }
        });
      }
    });
  }, [batch, batchId, frameId]);

  if (!batch || batch.rendered >= batch.total) {
    return null;
  }

  return (
    <div>
      <Frame
        id={frameId}
        variables={batch.variables}
        windowSize={[batch.windowWidth, batch.windowHeight]}
        scaledSize={[BATCH_PREVIEW_SIZE, BATCH_PREVIEW_SIZE]}
        nonce={batch.rendered}
      />
    </div>
  );
}
