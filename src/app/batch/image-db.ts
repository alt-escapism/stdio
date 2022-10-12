import { nanoid } from "nanoid";
import { VariableSnapshots } from "../../inject/variable-def.type";
import { DbObject, getDb } from "../db";

export function saveImageInDb({
  batchId,
  image,
  variables,
}: {
  batchId: string;
  image: Blob;
  variables: VariableSnapshots;
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
