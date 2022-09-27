import { proxy, subscribe } from "valtio";
import { captureImage } from "./capture";
import { getDb, THUMBNAIL_STORE } from "./db";
import { settings } from "./settings-state";
import { variables } from "./variables-state";

export type Thumbnails = Record<string, string>;

export const thumbnails = proxy<Thumbnails>({});

async function initThumbnails() {
  const db = await getDb();
  const thumbnailsData = await db.getAll(THUMBNAIL_STORE);
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  const thumbnailsToDelete: string[] = [];
  thumbnailsData.forEach(({ hash, image }) => {
    if (recentHashes.has(hash)) {
      thumbnails[hash] = image;
    } else {
      thumbnailsToDelete.push(hash);
    }
  });
  const tx = db.transaction(THUMBNAIL_STORE, "readwrite");
  await Promise.allSettled(
    thumbnailsToDelete.map((hash) => {
      return tx.objectStore(THUMBNAIL_STORE).delete(hash);
    })
  );
}

initThumbnails();

subscribe(thumbnails, async () => {
  await getDb();
});

export async function updateThumbnails() {
  // Clean up old thumbnails
  const recentHashes = new Set(settings.recents["fxhash"] ?? []);
  Object.keys(thumbnails).forEach((hash) => {
    if (!recentHashes.has(hash)) {
      delete thumbnails[hash];
    }
  });

  const imageURL = captureImage(32);
  if (imageURL) {
    const hash = variables["fxhash"].value;
    thumbnails[hash] = imageURL;
    const db = await getDb();
    db.put(THUMBNAIL_STORE, { hash, image: imageURL });
  }
}
