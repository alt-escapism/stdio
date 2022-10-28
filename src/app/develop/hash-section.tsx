import { HashVar } from "../../inject/variable-def.type";
import { useFrame } from "../frames-state";
import { Section } from "../generic-ui/section";
import { HashCombobox } from "../setting-controls/hash-combobox";

export function HashSection() {
  const _variables = useFrame("main").variables;

  return (
    <Section title="Hash">
      {Object.values(_variables)
        .filter((variable): variable is HashVar => variable.type === "Hash")
        .map((variable) => (
          <HashCombobox key={variable.name} variable={variable} />
        ))}
    </Section>
  );
}
