import { RiFileDownloadLine } from "react-icons/ri";
import { captureImage, downloadImage } from "../capture";
import { Button } from "../generic-ui/button";
import { variables } from "../variables-state";

export function DownloadButton() {
  return (
    <Button
      tip="Save image"
      onClick={() => {
        const imageURL = captureImage();
        if (imageURL) {
          const filename = variables["fxhash"].value as string;
          downloadImage(imageURL, filename);
        }
      }}
    >
      <RiFileDownloadLine />
    </Button>
  );
}
