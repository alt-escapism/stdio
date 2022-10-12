import { useSnapshot } from "valtio";
import { ObjectVar } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableDropdown } from "./generic-variable-dropdown";

export function ObjectDropdown({ variable }: { variable: ObjectVar }) {
  const _settings = useSnapshot(settings);
  const { name, options } = variable;
  const keys = Object.keys(options);

  return (
    <GenericVariableDropdown
      variable={variable}
      items={keys}
      selectedItem={
        getValueOfType(_settings.variables[name], "Object") ?? variable.value
      }
      renderItem={(item) => item}
      onSelect={(item) => {
        settings.variables[name] = {
          type: "Object",
          name,
          value: item,
        };
      }}
    />
  );
}
