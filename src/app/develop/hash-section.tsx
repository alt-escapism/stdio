import { useSnapshot } from "valtio";
import { HashVar } from "../../shared/variables.type";
import { Section } from "../generic-ui/section";
import { SettingListbox } from "../setting-controls/setting-listbox";
import { variables } from "../variables-state";

export function HashSection() {
  const _variables = useSnapshot(variables);

  return (
    <Section title="Hash">
      {Object.values(_variables)
        .filter((variable): variable is HashVar => variable.type === "Hash")
        .map((variable) => (
          <SettingListbox
            key={variable.name}
            variable={variable}
            header="Recent hashes"
          />
        ))}
    </Section>
  );
}
