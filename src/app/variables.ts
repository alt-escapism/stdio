import { Variable, VariableSnapshot } from "../inject/variable-def.type";

export function toVariableSnapshot(
  variable: VariableSnapshot
): VariableSnapshot {
  return {
    type: variable.type,
    name: variable.name,
    value: variable.value,
  } as VariableSnapshot;
}

export function getValueOfType<
  T extends VariableSnapshot,
  K extends VariableSnapshot["type"]
>(
  variable: VariableSnapshot | undefined,
  type: K
): (T & { type: K })["value"] | undefined {
  if (variable?.type === type) {
    return variable.value;
  }
  return;
}

export function isWritable(variable: VariableSnapshot): variable is Variable {
  return "writable" in variable && (variable as Variable).writable === true;
}
