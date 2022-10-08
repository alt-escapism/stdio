import { getAppInterface } from "./app-interface";
import { getStoredSettings } from "./settings-storage";
import { VariableDef } from "./variable-def.type";

export const frameId =
  document.documentElement.getAttribute("data-stdio-frame-id") || "main";

const dataStdioVariables = document.documentElement.getAttribute(
  "data-stdio-variables"
);

export const variables = dataStdioVariables
  ? JSON.parse(dataStdioVariables)
  : getStoredSettings().variables;

export function addVariable(variableDef: VariableDef) {
  getAppInterface()?.addVariable(frameId, variableDef);
}
