import { useSnapshot } from "valtio";
import { SimpleArrayVar, SimpleValue } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableDropdown } from "./generic-variable-dropdown";
import deepEqual from "fast-deep-equal";
import { ReactNode } from "react";
import { OptionView } from "./option-view";

export function SimpleArrayDropdown({
  variable,
}: {
  variable: SimpleArrayVar;
}) {
  const _settings = useSnapshot(settings);
  const { name, options } = variable;
  let activeValue = variable.value;
  const lockedValue = getValueOfType(_settings.variables[name], "SimpleArray");
  if (lockedValue != null) {
    const matchingOption = options.find((option) =>
      deepEqual(option, lockedValue)
    );
    if (matchingOption != null) {
      activeValue = matchingOption;
    }
  }

  return (
    <GenericVariableDropdown
      variable={variable}
      items={options}
      selectedItem={activeValue}
      renderItem={(item) => <SimpleValueView value={item} />}
      onSelect={(item) => {
        settings.variables[name] = {
          type: "SimpleArray",
          name,
          value: item,
        };
      }}
    />
  );
}

export function SimpleValueView({ value }: { value: SimpleValue }) {
  let content: ReactNode;
  if (value === null) {
    content = "null";
  } else if (Array.isArray(value)) {
    content = value.join(", ");
  } else if (typeof value === "object") {
    content = Object.entries(value)
      .map(([key, val]) => `${key}:${val}`)
      .join(", ");
  } else {
    content = value;
  }
  return (
    <OptionView>
      <span>{content}</span>
    </OptionView>
  );
}
