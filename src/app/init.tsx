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
  // Load font
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=block";
  document.head.appendChild(fontLink);

  // Render react app
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
