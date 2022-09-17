import { getSiblingFrame } from "../shared/frames";
import { getStoredSettings } from "../shared/settings-storage";
import { Variable } from "../shared/variables.type";

export const settings = getStoredSettings();

export function addVariable(variable: Variable) {
  getSiblingFrame("stdio")?.addVariable(variable);
}
