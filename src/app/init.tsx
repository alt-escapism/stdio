import React from "react";
import ReactDOM from "react-dom/client";
import { AppWindow } from "../inject/app-interface";
import { addVariable } from "./add-variable";
import { App } from "./app";
import { renderingComplete } from "./rendering-state";
import { initSettings } from "./settings-state";

export function initApp() {
  const w = window as unknown as AppWindow;
  w.stdioApp = {
    addVariable,
    renderingComplete,
  };
  initSettings();
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
