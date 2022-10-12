import { proxy, subscribe } from "valtio";
import {
  getStoredSettings,
  setStoredSettings,
} from "../inject/settings-storage";
import { Variable } from "../inject/variable-def.type";
import { toVariableSnapshot } from "./variables";

export const settings = proxy(getStoredSettings());

export function initSettings() {
  subscribe(settings, () => {
    setStoredSettings(settings);
  });

  function updateBackground() {
    document.body.style.background =
      settings.background === "dark" ? "#000" : "#fff";
  }
  updateBackground();
  subscribe(settings, updateBackground);
}

export function resetLockedVariables() {
  settings.variables = {};
}

export function lock(...variables: Variable[]) {
  variables.forEach((variable) => {
    settings.variables[variable.name] = toVariableSnapshot(variable);
  });
}

export function unlock(...variables: Variable[]) {
  variables.forEach((variable) => {
    delete settings.variables[variable.name];
  });
}
