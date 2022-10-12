import { useSnapshot } from "valtio";
import { SimpleArrayVar } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableDropdown } from "./generic-variable-dropdown";
import deepEqual from "fast-deep-equal";

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
      renderItem={(item) => {
        if (Array.isArray(item)) {
          return item.join(", ");
        }
        if (typeof item === "object") {
          return Object.entries(item)
            .map(([key, val]) => `${key}:${val}`)
            .join(", ");
        }
        return item;
      }}
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
