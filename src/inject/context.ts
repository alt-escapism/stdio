import { getAppInterface } from "./app-interface";
import { getStoredSettings } from "./settings-storage";
import { VariableSnapshots, Variable } from "./variable-def.type";

export const frameId =
  document.documentElement.getAttribute("data-stdio-frame-id") || "main";

const dataStdioVariables = document.documentElement.getAttribute(
  "data-stdio-variables"
);

export const variables: VariableSnapshots = dataStdioVariables
  ? JSON.parse(dataStdioVariables)
  : getStoredSettings().variables;

export function addVariable(variable: Variable) {
  getAppInterface()?.addVariable(frameId, variable);
}
