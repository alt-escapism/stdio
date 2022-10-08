import { projectKey } from "../inject/settings-storage";
import { Dexie } from "dexie";
import { Image, ImageMeta, Thumbnail } from "./db.type";

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
    });
  }
  return db;
}

export function getThumbnailsStore() {
  return getDb().table<Thumbnail>(THUMBNAILS);
}

export function getImagesStore() {
  return getDb().table<Image>(IMAGES);
}

export function getImagesMetaStore() {
  return getDb().table<ImageMeta>(IMAGES_META);
}
