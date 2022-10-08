import { nanoid } from "nanoid";
import { DbObject, getDb } from "../db";

export function saveImageInDb({
  batchId,
  image,
  variables,
}: {
  batchId: string;
  image: Blob;
  variables: Record<string, string>;
}) {
  const id = nanoid();
  const createdAt = new Date().toISOString();
  const imageMeta: DbObject["ImageMeta"] = {
    id,
    createdAt,
    batchId,
    variables,
  };
  const imageObject: DbObject["Image"] = { id, image };
  getDb().transaction("rw", getDb().ImageMeta, getDb().Image, () => {
    return Promise.all([
      getDb().ImageMeta.add(imageMeta),
      getDb().Image.add(imageObject),
    ]);
  });
}
