import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { subscribeKey } from "valtio/utils";
import { BATCH_THUMBNAIL_SIZES } from "../../inject/settings-storage";
import { captureImage } from "../capture";
import { getDb } from "../db";
import { Frame } from "../frame/frame";
import {
  requireFrame,
  resetFrame,
  getVariableSnapshots,
} from "../frames-state";
import { settings } from "../settings-state";
import { saveImageInDb } from "./image-db";

const THUMBNAIL_SIZES = [
  BATCH_THUMBNAIL_SIZES[2] *
    // TODO replace with pixel density
    2,
];

const IMAGE_QUALITY = 0.8;

export function BatchRenderer({
  batchId,
  frameId = "batch",
}: {
  batchId: string;
  frameId?: string;
}) {
  const _settings = useSnapshot(settings);
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  useEffect(() => {
    if (!batch || batch.rendered >= batch.total) return;

    return subscribeKey(requireFrame(frameId), "durationMs", () => {
      if (requireFrame(frameId).durationMs != null) {
        // Done rendering
        Promise.all([
          captureImage(frameId),
          ...THUMBNAIL_SIZES.map((size) =>
            captureImage(frameId, size, IMAGE_QUALITY)
          ),
        ]).then(([full, ...thumbnails]) => {
          if (full) {
            saveImageInDb({
              batchId,
              image: full,
              variables: getVariableSnapshots(frameId),
              thumbnails: thumbnails
                .map((image, index) => ({
                  size: THUMBNAIL_SIZES[index],
                  image,
                }))
                .filter(
                  (thumbnail): thumbnail is { size: number; image: Blob } =>
                    thumbnail.image != null
                ),
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
    <Frame
      id={frameId}
      variables={batch.variables}
      windowSize={[batch.windowWidth, batch.windowHeight]}
      scaledSize={[_settings.batchThumbnailSize, _settings.batchThumbnailSize]}
      nonce={batch.rendered}
    />
  );
}
