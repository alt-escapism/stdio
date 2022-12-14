import { proxy } from "valtio";
import { captureImage } from "./capture";
import { getDb } from "./db";
import { getHash } from "./frames-state";
import { settings } from "./settings-state";

export type Thumbnails = Record<string, string>;

export const thumbnails = proxy<Thumbnails>({});

async function initThumbnails() {
  const thumbnailsData = await getDb().Thumbnail.toArray();
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  const thumbnailsToDelete: string[] = [];
  thumbnailsData.forEach(({ hash, image }) => {
    if (recentHashes.has(hash) && typeof image === "object") {
      thumbnails[hash] = URL.createObjectURL(image);
    } else {
      thumbnailsToDelete.push(hash);
    }
  });
  await getDb().Thumbnail.bulkDelete(thumbnailsToDelete);
}

initThumbnails();

export async function updateThumbnails() {
  // Clean up old thumbnails
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  Object.keys(thumbnails).forEach((hash) => {
    if (!recentHashes.has(hash)) {
      URL.revokeObjectURL(thumbnails[hash]);
      delete thumbnails[hash];
    }
  });

  const blob = await captureImage("main", 32);
  if (blob) {
    const hash = getHash("main");
    if (hash) {
      thumbnails[hash] = URL.createObjectURL(blob);
      getDb().Thumbnail.put({ hash, image: blob });
    }
  }
}
