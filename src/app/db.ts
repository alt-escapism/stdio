import { projectKey } from "../inject/settings-storage";
import { Dexie, Table } from "dexie";
import { VariableSnapshots } from "../inject/variable-def.type";

export type DbObject = {
  Thumbnail: { hash: string; image: Blob };
  Image: { id: string; image: Blob };
  ImageMeta: {
    id: string;
    createdAt: string;
    batchId: string;
    variables: VariableSnapshots;
  };
};

const schema: { [k in keyof DbObject]: string } = {
  Thumbnail: `hash`,
  Image: `id`,
  ImageMeta: `id,batchId`,
};

export type Db = Dexie & { [k in keyof DbObject]: Table<DbObject[k]> };

let db: Db;
export function getDb() {
  if (!db) {
    db = new Dexie(projectKey) as Db;
    db.version(2).stores({
      thumbnails: null,
      ...schema,
    });
  }
  return db;
}
