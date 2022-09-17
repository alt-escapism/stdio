import { Variable } from "../shared/variables.type";
import { settings } from "./settings-state";
import { variables } from "./variables-state";

const MAX_RECENTS = 10;

export function addVariable(variable: Variable) {
  const { name, value } = variable;

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
