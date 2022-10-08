import { projectKey } from "../inject/settings-storage";
import { Dexie } from "dexie";

export const THUMBNAILS = "thumbnails";

export const IMAGES = "images";

export const IMAGES_META = "imagesMeta";

export const BATCHES = "batches";

let db: Dexie;

export function getDb() {
  if (!db) {
    db = new Dexie(projectKey);
    db.version(2).stores({
      [THUMBNAILS]: `hash`,
      [IMAGES]: `id`,
      [IMAGES_META]: `id,batchId`,
      [BATCHES]: `id`,
    });
  }
  return db;
}
