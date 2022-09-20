import { init, render } from "./init";

init();
const rootEl = document.getElementById("root");
if (rootEl) {
  render(rootEl);
}
