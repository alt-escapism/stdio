import React from "react";
import ReactDOM from "react-dom/client";
import { getParentFrame, StdioFrame } from "../shared/frames";
import { addVariable } from "./add-variable";
import { App } from "./app";
import { renderingComplete } from "./rendering-state";

export function init() {
  const w = window as unknown as StdioFrame;
  w.addVariable = addVariable;
  w.renderingComplete = renderingComplete;
  try {
    (getParentFrame() as any).onStdioReady?.();
  } catch (e) {}
}

export function render(rootEl: HTMLElement) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
