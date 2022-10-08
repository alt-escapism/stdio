import { initApp, render } from "../app/init";
import { setIsEmbedded } from "../app/is-embedded";
import { injectAll } from "../inject/inject-all";

setIsEmbedded(true);
initApp();
injectAll();

if (document.body) {
  renderEmbed();
} else {
  window.addEventListener("DOMContentLoaded", renderEmbed);
}

function renderEmbed() {
  const APP_WIDTH = "360px";

  // Resize body
  document.body.style.marginRight = APP_WIDTH;

  // Render react app
  const rootEl = document.createElement("div");
  rootEl.style.width = APP_WIDTH;
  rootEl.style.position = "fixed";
  rootEl.style.top = "0";
  rootEl.style.right = "0";
  rootEl.style.bottom = "0";
  document.body.append(rootEl);
  render(rootEl);
}
