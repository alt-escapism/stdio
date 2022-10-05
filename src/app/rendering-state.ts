import { proxy } from "valtio";
import { updateThumbnails } from "./thumbnails-state";

export type Rendering = {
  durationMs?: number;
};

export const rendering = proxy<Rendering>({});

export function renderingComplete(durationMs: number) {
  rendering.durationMs = durationMs;
  updateThumbnails();
}

export function resetRendering() {
  rendering.durationMs = undefined;
}
