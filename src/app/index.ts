import { initApp, render } from "./init";

initApp();
const rootEl = document.getElementById("root");
if (rootEl) {
  render(rootEl);
}

// Override overly-strict readonly return types
declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
  function snapshot<T extends object>(p: T): T;
}
