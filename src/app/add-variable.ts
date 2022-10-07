import { Variable } from "../inject/variables.type";
import { settings } from "./settings-state";
import { variables } from "./variables-state";

const MAX_RECENTS = 20;

export function addVariable(variable: Variable) {
  const { name, value } = variable;

  if (!name) {
    return;
  }

  variables[name] = variable;

  if (variable.type === "Hash") {
    if (!settings.recents[name]) {
      settings.recents[name] = [];
    }
    if (!settings.recents[name].find((v) => v === value)) {
      settings.recents[name].unshift(variable.value);
      settings.recents[name] = settings.recents[name].slice(0, MAX_RECENTS);
    }
  }
}
