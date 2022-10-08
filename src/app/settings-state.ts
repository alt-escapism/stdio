import { subscribe } from "valtio";
import { proxyWithComputed } from "valtio/utils";
import {
  getStoredSettings,
  setStoredSettings,
} from "../inject/settings-storage";
import { Variable } from "../inject/variables.type";

export const settings = proxyWithComputed(getStoredSettings(), {
  runningBatch: (snap) =>
    Object.values(snap.batches)
      .filter((batch) => batch.done < batch.total && !batch.stopped)
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0],
});

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
    settings.variables[variable.name] = String(variable.value);
  });
}

export function unlock(...variables: Variable[]) {
  variables.forEach((variable) => {
    delete settings.variables[variable.name];
  });
}
