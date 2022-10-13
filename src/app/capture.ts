export function captureImage(
  frameId: string,
  size?: number,
  quality: number = 1
): Promise<Blob | null> {
  const iframe = document.getElementById(frameId) as HTMLIFrameElement | null;
  const w = iframe?.contentWindow ?? window;
  const canvas = w.document.querySelector("canvas");
  if (canvas) {
    let _canvas = canvas;
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
      _canvas = newCanvas;
    }
    return new Promise((resolve) => {
      _canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    });
  }
  return Promise.resolve(null);
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  downloadFile(`${filename}.jpeg`, url);
  URL.revokeObjectURL(url);
}

function downloadFile(filename: string, href: string) {
  const link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute("href", href);
  document.body.appendChild(link); // Required for FF
  link.click();
}
