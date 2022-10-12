import { useSnapshot } from "valtio";
import { HashVar } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableDropdown } from "./generic-variable-dropdown";
import { HashOption } from "./hash-option";

export function HashDropdown({ variable }: { variable: HashVar }) {
  const _settings = useSnapshot(settings);
  const { name, value } = variable;

  return (
    <GenericVariableDropdown
      variable={variable}
      items={_settings.recents[name]}
      selectedItem={getValueOfType(_settings.variables[name], "Hash") ?? value}
      renderItem={(hash) => <HashOption hash={hash} />}
      onSelect={(hash) => {
        settings.variables[name] = {
          type: "Hash",
          name,
          value: hash,
        };
      }}
    />
  );
}
