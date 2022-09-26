import { proxy } from "valtio";
import { captureImage } from "./capture";
import { variables } from "./variables-state";

export type Rendering = {
  durationMs?: number;
  thumbnails: Record<string, string>;
};

export const rendering = proxy<Rendering>({ thumbnails: {} });

export function renderingComplete(durationMs: number) {
  rendering.durationMs = durationMs;

  const imageURL = captureImage(32);
  if (imageURL) {
    rendering.thumbnails[variables["fxhash"].value] = imageURL;
  }
}

export function resetRendering() {
  rendering.durationMs = undefined;
}
