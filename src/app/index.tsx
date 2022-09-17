import React from "react";
import ReactDOM from "react-dom/client";
import { StdioFrame } from "../shared/frames";
import { addVariable } from "./add-variable";
import { App } from "./app";
import { renderingComplete } from "./rendering-state";

const w = window as unknown as StdioFrame;
w.addVariable = addVariable;
w.renderingComplete = renderingComplete;
(window.parent as any).onStdioReady?.();

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
