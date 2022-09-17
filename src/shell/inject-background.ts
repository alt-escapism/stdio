import { MainFrame } from "../shared/frames";
import { Settings } from "../shared/settings.type";
import { settings } from "./context";

export function injectBackground() {
  window.addEventListener("DOMContentLoaded", () => {
    setBackground(settings.background);
    (window as unknown as MainFrame).__stdioSetBackground = setBackground;
  });
}

function setBackground(background: Settings["background"]) {
  document.body.style.background = background === "dark" ? "#000" : "#FFF";
}
