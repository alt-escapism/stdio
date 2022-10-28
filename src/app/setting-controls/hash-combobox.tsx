import { useSnapshot } from "valtio";
import { HashVar } from "../../inject/variable-def.type";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { GenericVariableCombobox } from "./generic-variable-combobox";
import { HashOption } from "./hash-option";

export function HashCombobox({ variable }: { variable: HashVar }) {
  const _settings = useSnapshot(settings);
  const { name, value } = variable;

  return (
    <GenericVariableCombobox
      variable={variable}
      items={_settings.recents[name]}
      itemToString={(hash) => hash ?? ""}
      selectedItem={getValueOfType(_settings.variables[name], "Hash") ?? value}
      renderItem={(hash) => <HashOption hash={hash} />}
      getItemForInput={(input) => input}
      onSelect={(hash) => {
        settings.variables[name] = {
          type: "Hash",
          name,
          value: hash,
        };
      }}
      header="Recent hashes"
    />
  );
}
