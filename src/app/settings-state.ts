import { proxy, subscribe } from "valtio";
import { subscribeKey } from "valtio/utils";
import {
  getStoredSettings,
  setStoredSettings,
} from "../inject/settings-storage";
import { Settings } from "../inject/settings.type";
import { VariableSnapshot } from "../inject/variable-def.type";
import { decode } from "./develop/share";
import { toVariableSnapshot } from "./variables";

const rawSettings = getStoredSettings();
// Check URL to see if there are settings there
const url = new URL(window.location.href);
const shared = url.searchParams.get("s");
if (shared) {
  rawSettings.variables = decode(shared);
  url.searchParams.delete("s");
  window.history.replaceState({}, "", url.href);
  setStoredSettings(rawSettings);
}

export const settings = proxy(rawSettings);

export function initSettings() {
  subscribe(settings, () => {
    setStoredSettings(settings);
  });
  subscribeKey(settings, "background", updateBackground);
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

export function updateBackground() {
  document.body.style.background = getBackgroundColor(settings);
}

export function getBackgroundColor(settings: Settings) {
  return settings.background === "dark" ? "#000" : "#fff";
}
