import { getFrame } from "../shared/frames";
import { Variable } from "../shared/variables.type";
import { resetRendering } from "./rendering-state";
import { settings } from "./settings-state";
import { resetVariables } from "./variables-state";

export function reload() {
  resetVariables();
  resetRendering();
  getFrame("main")?.location.reload();
}

export function autoReload(...variables: Variable[]) {
  if (settings.autoReload) {
    const needsReload = variables.some((variable) => {
      const { name } = variable;
      const lockedValue = settings.variables[name];
      if (lockedValue == null && variable.shadowed != null) {
        return true;
      } else if (
        lockedValue != null &&
        lockedValue !== String(variable.value)
      ) {
        return true;
      }
      return false;
    });
    if (needsReload) {
      reload();
    }
  }
}
