import { RiFileDownloadLine } from "react-icons/ri";
import { getFrame } from "../shared/frames";
import { GenericIconButton } from "./generic-icon-button";
import { variables } from "./variables-state";

export function DownloadButton() {
  return (
    <GenericIconButton
      onClick={() => {
        const canvas = getFrame("main")?.document.querySelector("canvas");
        if (canvas) {
          const filename = variables["fxhash"].value as string;
          downloadImage(canvas, filename);
        }
      }}
    >
      <RiFileDownloadLine />
    </GenericIconButton>
  );
}

function downloadImage(canvas: HTMLCanvasElement, filename: string) {
  const imageURI = canvas.toDataURL("image/jpg");
  downloadFile(`${filename}.jpeg`, imageURI);
}

function downloadFile(filename: string, href: string) {
  const link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute("href", href);
  document.body.appendChild(link); // Required for FF
  link.click();
}
