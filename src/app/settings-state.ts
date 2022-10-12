import { proxy, subscribe } from "valtio";
import {
  getStoredSettings,
  setStoredSettings,
} from "../inject/settings-storage";
import { Settings } from "../inject/settings.type";
import { VariableSnapshot } from "../inject/variable-def.type";
import { toVariableSnapshot } from "./variables";

export const settings = proxy(getStoredSettings());

export function initSettings() {
  subscribe(settings, () => {
    setStoredSettings(settings);
  });

  function updateBackground() {
    document.body.style.background = getBackgroundColor(settings);
  }
  updateBackground();
  subscribe(settings, updateBackground);
}

export function resetLockedVariables() {
  settings.variables = {};
}

export function lock(...variables: VariableSnapshot[]) {
  variables.forEach((variable) => {
    settings.variables[variable.name] = toVariableSnapshot(variable);
  });
}

export function unlock(...variables: VariableSnapshot[]) {
  variables.forEach((variable) => {
    delete settings.variables[variable.name];
  });
}

export function getBackgroundColor(settings: Settings) {
  return settings.background === "dark" ? "#000" : "#fff";
}
