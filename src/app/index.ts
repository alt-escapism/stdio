import { initAppInterface, render } from "./init";

initAppInterface();
const rootEl = document.getElementById("root");
if (rootEl) {
  render(rootEl);
}
