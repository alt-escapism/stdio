import { getAppInterface } from "./app-interface";
import { getStoredSettings } from "./settings-storage";
import { Variable } from "./variables.type";

const dataStdioVariables = document.documentElement.getAttribute(
  "data-stdio-variables"
);

export const variables = dataStdioVariables
  ? JSON.parse(dataStdioVariables)
  : getStoredSettings().variables;

export function addVariable(variable: Variable) {
  getAppInterface()?.addVariable(variable);
}
