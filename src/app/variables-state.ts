import { proxy } from "valtio";
import { Variables } from "../inject/variables.type";

export const variables = proxy<Variables>({});

export function resetVariables() {
  Object.keys(variables).forEach((key) => {
    delete variables[key];
  });
}
