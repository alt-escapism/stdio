import { BiTrash } from "react-icons/bi";
import { getDb } from "../db";
import { Button } from "../generic-ui/button";
import { Dialog } from "../generic-ui/dialog";
import { pushScreen, popScreen } from "../navigation";

export function DeleteBatchButton({
  batchId,
  onSuccess,
}: {
  batchId: string;
  onSuccess: () => void;
}) {
  return (
    <Button
      tip="Delete batch"
      onClick={() => {
        pushScreen([
          "dialog",
          <Dialog
            body="Deleting this batch will permanently delete the images as well. Are you sure you want to continue?"
            actions={[
              {
                children: "Yes",
                primary: true,
                onClick: () =>
                  deleteBatch(batchId).then(() => {
                    popScreen();
                    onSuccess();
                  }),
              },
              { children: "No", onClick: () => popScreen() },
            ]}
          />,
        ]);
      }}
    >
      <BiTrash />
    </Button>
  );
}

function deleteBatch(batchId: string) {
  const db = getDb();
  return db.transaction(
    "readwrite",
    [db.Image, db.ImageMeta, db.ImageThumbnail, db.Batch],
    async () => {
      const imageIds = await db.ImageMeta.where("batchId")
        .equals(batchId)
        .primaryKeys();
      await db.Image.bulkDelete(imageIds);
      await db.ImageMeta.bulkDelete(imageIds);
      await db.ImageThumbnail.where("id").anyOf(imageIds).delete();
      await db.Batch.delete(batchId);
    }
  );
}
