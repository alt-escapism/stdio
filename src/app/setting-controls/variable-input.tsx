import { Variable } from "../../inject/variable-def.type";
import { ArrayDropdown } from "./array-dropdown";
import { BooleanSwitch } from "./boolean-switch";
import { HashCombobox } from "./hash-combobox";
import { NumberInput } from "./number-input";
import { ObjectDropdown } from "./object-dropdown";
import { SimpleArrayDropdown } from "./simple-array-dropdown";

export function VariableInput({ variable }: { variable: Variable }) {
  const { type } = variable;
  if (type === "Array") {
    return <ArrayDropdown variable={variable} />;
  }
  if (type === "Hash") {
    return <HashCombobox variable={variable} />;
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
  if (type === "Boolean") {
    return <BooleanSwitch variable={variable} />;
  }
  const _type: never = type;
  return _type;
}
