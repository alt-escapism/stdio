import { useSnapshot } from "valtio";
import { HashSection } from "./hash-section";
import { VariablesSection } from "./variables-section/variables-section";
import { variables } from "./variables-state";

export function AppMain() {
  const _variables = useSnapshot(variables);
  if (Object.keys(_variables).length === 0) {
    return <main></main>;
  }

  return (
    <main>
      <HashSection />
      <VariablesSection />
    </main>
  );
}
