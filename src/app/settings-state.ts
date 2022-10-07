import { subscribe } from "valtio";
import { proxyWithComputed } from "valtio/utils";
import {
  getStoredSettings,
  setStoredSettings,
} from "../shared/settings-storage";
import { Variable } from "../shared/variables.type";

export const settings = proxyWithComputed(getStoredSettings(), {
  runningBatch: (snap) =>
    Object.values(snap.batches)
      .filter((batch) => batch.done < batch.total && !batch.stopped)
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0],
});

subscribe(settings, () => {
  setStoredSettings(settings);
});

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
