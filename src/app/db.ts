import { IDBPDatabase, openDB } from "idb";
import { projectKey } from "../shared/settings-storage";

let db: Promise<IDBPDatabase<unknown>>;

export const THUMBNAIL_STORE = "thumbnails";

export function getDb() {
  if (!db) {
    db = openDB(projectKey, 1, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        db.createObjectStore(THUMBNAIL_STORE, { keyPath: "hash" });
      },
    });
  }
  return db;
}
