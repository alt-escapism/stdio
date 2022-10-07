export function captureImage(frameId: string, size?: number): string | null {
  const iframe = document.getElementById(frameId) as HTMLIFrameElement | null;
  const w = iframe?.contentWindow ?? window;
  const canvas = w.document.querySelector("canvas");
  if (canvas) {
    if (size) {
      const { width, height } = canvas;
      const maxSize = Math.max(width, height);
      const rWidth = width / maxSize;
      const rHeight = height / maxSize;
      const newCanvas = document.createElement("canvas");
      newCanvas.width = rWidth * size;
      newCanvas.height = rHeight * size;
      newCanvas
        .getContext("2d")!
        .drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      return newCanvas.toDataURL("image/jpg");
    }
    return canvas.toDataURL("image/jpg");
  }
  return null;
}

export function downloadImage(imageURL: string, filename: string) {
  downloadFile(`${filename}.jpeg`, imageURL);
}

function downloadFile(filename: string, href: string) {
  const link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute("href", href);
  document.body.appendChild(link); // Required for FF
  link.click();
}
