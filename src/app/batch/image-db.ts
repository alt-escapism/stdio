import { nanoid } from "nanoid";
import { VariableSnapshots } from "../../inject/variable-def.type";
import { DbObject, getDb } from "../db";

export function saveImageInDb({
  batchId,
  image,
  variables,
  thumbnails = [],
}: {
  batchId: string;
  image: Blob;
  variables: VariableSnapshots;
  thumbnails?: { size: number; image: Blob }[];
}) {
  const id = nanoid();
  const createdAt = new Date().toISOString();
  const imageMeta: DbObject["ImageMeta"] = {
    id,
    createdAt,
    batchId,
    variables,
    thumbnailSizes: thumbnails.map(({ size }) => size),
  };
  const imageObject: DbObject["Image"] = { id, image };
  const db = getDb();
  db.transaction("rw", [db.ImageMeta, db.Image, db.ImageThumbnail], () => {
    const writes = [
      db.ImageMeta.add(imageMeta),
      db.Image.add(imageObject),
      thumbnails.length
        ? db.ImageThumbnail.bulkAdd(
            thumbnails.map((thumbnail) => ({
              id,
              size: thumbnail.size,
              image: thumbnail.image,
            }))
          )
        : null,
    ];
    return Promise.all(writes);
  });
}
