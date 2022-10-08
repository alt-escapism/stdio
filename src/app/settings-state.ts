import { proxy, subscribe } from "valtio";
import {
  getStoredSettings,
  setStoredSettings,
} from "../inject/settings-storage";
import { VariableDef } from "../inject/variable-def.type";

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

export function lock(...variables: VariableDef[]) {
  variables.forEach((variable) => {
    settings.variables[variable.name] = String(variable.value);
  });
}

export function unlock(...variables: VariableDef[]) {
  variables.forEach((variable) => {
    delete settings.variables[variable.name];
  });
}
