import { proxy, subscribe } from "valtio";
import {
  getStoredSettings,
  setStoredSettings,
} from "../shared/settings-storage";
import { Settings } from "../shared/settings.type";
import { Variable } from "../shared/variables.type";

export const settings = proxy<Settings>(getStoredSettings());

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
