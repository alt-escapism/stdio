import { Dexie, Table } from "dexie";
import { VariableSnapshots } from "../inject/variable-def.type";
import { config } from "../inject/config";

export type DbObject = {
  Thumbnail: { hash: string; image: Blob };
  Batch: {
    id: string;
    createdAt: string;
    rendered: number;
    total: number;
    windowWidth: number;
    windowHeight: number;
    variables: VariableSnapshots;
  };
  Image: { id: string; image: Blob };
  ImageMeta: {
    id: string;
    createdAt: string;
    batchId: string;
    variables: VariableSnapshots;
    thumbnailSizes: number[];
  };
  ImageThumbnail: {
    id: string;
    size: number;
    image: Blob;
  };
};

const schema: { [k in keyof DbObject]: string } = {
  Thumbnail: `hash`,
  Image: `id`,
  ImageMeta: `id,batchId`,
  ImageThumbnail: `[id+size],id`,
  Batch: `id,createdAt`,
};

export type Db = Dexie & { [k in keyof DbObject]: Table<DbObject[k]> };

let db: Db;
export function getDb() {
  if (!db) {
    db = new Dexie(config.project) as Db;
    db.version(2).stores({
      thumbnails: null,
      ...schema,
    });
  }
  return db;
}
