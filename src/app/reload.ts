import { Variable } from "../inject/variable-def.type";
import { reloadDevelopFrame } from "./develop/develop-frame";
import { resetFrame } from "./frames-state";
import { isEmbedded } from "./is-embedded";
import { settings } from "./settings-state";

export function reload() {
  resetFrame("main");
  isEmbedded() ? window.location.reload() : reloadDevelopFrame();
}

export function autoReload(...variables: Variable[]) {
  if (settings.autoReload) {
    const needsReload = variables.some((variable) => {
      const { name } = variable;
      const lockedValue = settings.variables[name]?.value;
      if (lockedValue === undefined && variable.shadowed !== undefined) {
        return true;
      } else if (lockedValue !== undefined && lockedValue !== variable.value) {
        return true;
      }
      return false;
    });
    if (needsReload) {
      reload();
    }
  }
}
