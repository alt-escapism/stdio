import { VariableSnapshot } from "../../inject/variable-def.type";
import { OptionView } from "./option-view";
import { SimpleValueView } from "./simple-array-dropdown";

export function VariableView({ variable }: { variable: VariableSnapshot }) {
  const { type } = variable;
  if (type === "Array") {
    return (
      <OptionView>
        <span>{variable.value}</span>
      </OptionView>
    );
  }
  if (type === "Hash") {
    return (
      <OptionView>
        <span>{variable.value}</span>
      </OptionView>
    );
  }
  if (type === "Number") {
    return (
      <OptionView>
        <span>{variable.value}</span>
      </OptionView>
    );
  }
  if (type === "Object") {
    return (
      <OptionView>
        <span>{variable.value}</span>
      </OptionView>
    );
  }
  if (type === "SimpleArray") {
    return <SimpleValueView value={variable.value} />;
  }
  if (type === "Boolean") {
    return (
      <OptionView>
        <span>{String(variable.value)}</span>
      </OptionView>
    );
  }
  const _: never = type;
  return _;
}
