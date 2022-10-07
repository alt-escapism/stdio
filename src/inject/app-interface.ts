import { Variable } from "./variables.type";

export type AppInterface = {
  addVariable: (variable: Variable) => void;
  renderingComplete: (duration: number) => void;
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
