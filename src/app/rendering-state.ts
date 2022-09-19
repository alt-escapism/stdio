import { proxy } from "valtio";

export type Rendering = {
  durationMs?: number;
};

export const rendering = proxy<Rendering>({});

export function renderingComplete(durationMs: number) {
  rendering.durationMs = durationMs;
}

export function resetRendering() {
  rendering.durationMs = undefined;
}
