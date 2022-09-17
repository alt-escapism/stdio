import { Settings } from "./settings.type";
import { Variable } from "./variables.type";

export type MainFrame = Window & {
  __stdioSetBackground?: (lighting: Settings["background"]) => void;
};

export type StdioFrame = Window & {
  addVariable: (variable: Variable) => void;
  renderingComplete: (duration: number) => void;
};

export function getSiblingFrame(id: "main"): MainFrame | null;
export function getSiblingFrame(id: "stdio"): StdioFrame | null;
export function getSiblingFrame(
  id: "main" | "stdio"
): Window | StdioFrame | null {
  // If there's a parent, and it's the same origin, assume it's the top-level
  // stdio frame
  if (
    window.parent !== null &&
    window.parent !== window &&
    window.parent.origin === window.origin
  ) {
    const frameElement = window.parent.document.getElementById(
      id
    ) as HTMLIFrameElement;
    return frameElement.contentWindow;
  }

  return null;
}
