import { useSnapshot } from "valtio";
import { ArrayVar } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableDropdown } from "./generic-variable-dropdown";

function getItemName(item: unknown): string | undefined {
  return typeof item === "object" && item !== null
    ? (item as { name?: string }).name
    : undefined;
}

export function ArrayDropdown({ variable }: { variable: ArrayVar }) {
  const _settings = useSnapshot(settings);
  const { name, options } = variable;

  return (
    <GenericVariableDropdown
      variable={variable}
      items={options}
      selectedItem={
        options[
          getValueOfType(_settings.variables[name], "Array") ?? variable.value
        ]
      }
      renderItem={(item) => getItemName(item) ?? options.indexOf(item)}
      onSelect={(item) => {
        settings.variables[name] = {
          type: "Array",
          name,
          value: options.indexOf(item),
        };
      }}
    />
  );
}
