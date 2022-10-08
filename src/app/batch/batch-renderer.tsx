import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";
import { captureImage } from "../capture";
import { Frame } from "../frame/frame";
import {
  requireFrame,
  resetFrame,
  getActiveVariableValues,
} from "../frames-state";
import { settings } from "../settings-state";
import { BATCH_PREVIEW_SIZE } from "./batch-preview";
import { saveImageInDb } from "./image-db";

export function BatchRenderer({
  batchId,
  frameId = "batch",
}: {
  batchId: string;
  frameId?: string;
}) {
  const _settings = useSnapshot(settings);
  const batch = _settings.batches[batchId];

  useEffect(() => {
    return subscribeKey(requireFrame(frameId), "durationMs", () => {
      if (requireFrame(frameId).durationMs != null) {
        // Done rendering
        captureImage(frameId).then((blob) => {
          if (blob) {
            saveImageInDb({
              batchId,
              image: blob,
              variables: getActiveVariableValues(frameId),
            });
          }
          resetFrame(frameId);
          settings.batches[batchId].done++;
        });
      }
    });
  }, [batchId, frameId]);

  if (!batch || batch.done >= batch.total) {
    return null;
  }

  return (
    <div>
      <Frame
        id={frameId}
        variables={batch.variables}
        windowSize={[batch.windowWidth, batch.windowHeight]}
        scaledSize={[BATCH_PREVIEW_SIZE, BATCH_PREVIEW_SIZE]}
        nonce={batch.done}
      />
    </div>
  );
}
