import { RiFileDownloadLine } from "react-icons/ri";
import { captureImage, downloadImage } from "../capture";
import { getHash } from "../frames-state";
import { Button } from "../generic-ui/button";

export function DownloadButton() {
  return (
    <Button
      tip="Save image"
      onClick={() => {
        captureImage("main").then((blob) => {
          if (blob) {
            const filename = getHash("main");
            if (filename) {
              downloadImage(blob, filename);
            }
          }
        });
      }}
    >
      <RiFileDownloadLine />
    </Button>
  );
}
