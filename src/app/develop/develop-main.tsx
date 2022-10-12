import { HashSection } from "./hash-section";
import { VariablesSection } from "../variables-section/variables-section";
import { useFrame } from "../frames-state";

export function DevelopMain() {
  const _variables = useFrame("main").variables;
  if (Object.keys(_variables).length === 0) {
    return <div></div>;
  }

  return (
    <>
      <HashSection />
      <VariablesSection />
    </>
  );
}
