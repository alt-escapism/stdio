import { RiFileDownloadLine } from "react-icons/ri";
import { downloadImage } from "../capture";
import { Button } from "../generic-ui/button";

export function DownloadButton({
  getImage,
}: {
  getImage: () => Promise<{
    image: Blob;
    filename: string | undefined;
  } | null>;
}) {
  return (
    <Button
      tip="Save image"
      onClick={() => {
        getImage().then((image) => {
          if (image) {
            downloadImage(image.image, image.filename ?? "image");
          }
        });
      }}
    >
      <RiFileDownloadLine />
    </Button>
  );
}
