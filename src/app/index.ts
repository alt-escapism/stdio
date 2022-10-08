import { initApp, render } from "./init";

initApp();
const rootEl = document.getElementById("root");
if (rootEl) {
  render(rootEl);
}
