import React from "react";
import ReactDOM from "react-dom/client";
import { AppWindow } from "../inject/app-interface";
import { appInterface } from "./app-interface";
import { App } from "./app";
import { initSettings, updateBackground } from "./settings-state";

export function initApp() {
  const w = window as unknown as AppWindow;
  w.stdioApp = appInterface;
  initSettings();
}

export function render(rootEl: HTMLElement) {
  updateBackground();

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
