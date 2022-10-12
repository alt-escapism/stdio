import { Variable } from "./variable-def.type";

export type AppInterface = {
  addVariable: (frameId: string, variable: Variable) => void;
  renderingComplete: (frameId: string, durationMs: number) => void;
};

export type AppWindow = Window & {
  stdioApp: AppInterface;
};

export function getAppInterface() {
  if ("stdioApp" in window) {
    return (window as unknown as AppWindow).stdioApp;
  }
  const parent = getParentWindow();
  if (parent && "stdioApp" in parent) {
    return (parent as unknown as AppWindow).stdioApp;
  }
  return null;
}

function getParentWindow(): Window | null {
  const w = window;
  try {
    if (w.parent !== w && w.parent.origin === w.origin) {
      return w.parent;
    }
  } catch (e) {}

  return null;
}
