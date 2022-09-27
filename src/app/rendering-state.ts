import { proxy } from "valtio";
import { updateThumbnails } from "./thumbnails-state";

export type Rendering = {
  durationMs?: number;
  thumbnails: Record<string, string>;
};

export const rendering = proxy<Rendering>({ thumbnails: {} });

export function renderingComplete(durationMs: number) {
  rendering.durationMs = durationMs;
  updateThumbnails();
}

export function resetRendering() {
  rendering.durationMs = undefined;
}
