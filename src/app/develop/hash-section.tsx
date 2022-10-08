import { HashVar } from "../../inject/variable-def.type";
import { useFrame } from "../frames-state";
import { Section } from "../generic-ui/section";
import { SettingListbox } from "../setting-controls/setting-listbox";

export function HashSection() {
  const _variableDefs = useFrame("main").variableDefs;

  return (
    <Section title="Hash">
      {Object.values(_variableDefs)
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
