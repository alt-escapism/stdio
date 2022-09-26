import { RiFileDownloadLine } from "react-icons/ri";
import { captureImage, downloadImage } from "./capture";
import { GenericIconButton } from "./generic-icon-button";
import { variables } from "./variables-state";

export function DownloadButton() {
  return (
    <GenericIconButton
      onClick={() => {
        const imageURL = captureImage();
        if (imageURL) {
          const filename = variables["fxhash"].value as string;
          downloadImage(imageURL, filename);
        }
      }}
    >
      <RiFileDownloadLine />
    </GenericIconButton>
  );
}
