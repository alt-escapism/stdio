import { Variable } from "../../inject/variable-def.type";
import { ArrayDropdown } from "./array-dropdown";
import { HashDropdown } from "./hash-dropdown";
import { NumberInput } from "./number-input";
import { ObjectDropdown } from "./object-dropdown";
import { SimpleArrayDropdown } from "./simple-array-dropdown";

export function VariableInput({ variable }: { variable: Variable }) {
  const { type } = variable;
  if (type === "Array") {
    return <ArrayDropdown variable={variable} />;
  }
  if (type === "Hash") {
    return <HashDropdown variable={variable} />;
  }
  if (type === "Number") {
    return <NumberInput variable={variable} />;
  }
  if (type === "Object") {
    return <ObjectDropdown variable={variable} />;
  }
  if (type === "SimpleArray") {
    return <SimpleArrayDropdown variable={variable} />;
  }
  return type as never;
}
