import { proxy } from "valtio";
import { captureImage } from "./capture";
import { THUMBNAILS, getDb } from "./db";
import { settings } from "./settings-state";
import { variables } from "./variables-state";

export type Thumbnails = Record<string, string>;

export const thumbnails = proxy<Thumbnails>({});

async function initThumbnails() {
  const thumbnailsStore = getDb().table(THUMBNAILS);
  const thumbnailsData = await thumbnailsStore.toArray();
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  const thumbnailsToDelete: string[] = [];
  thumbnailsData.forEach(({ hash, image }) => {
    if (recentHashes.has(hash) && typeof image === "object") {
      thumbnails[hash] = URL.createObjectURL(image);
    } else {
      thumbnailsToDelete.push(hash);
    }
  });
  await thumbnailsStore.bulkDelete(thumbnailsToDelete);
}

initThumbnails();

export async function updateThumbnails() {
  // Clean up old thumbnails
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  Object.keys(thumbnails).forEach((hash) => {
    if (!recentHashes.has(hash)) {
      delete thumbnails[hash];
    }
  });

  const blob = await captureImage("main", 32);
  if (blob) {
    const hash = variables["fxhash"].value;
    thumbnails[hash] = URL.createObjectURL(blob);
    getDb().table(THUMBNAILS).put({ hash, image: blob });
  }
}
