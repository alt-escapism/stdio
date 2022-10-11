import { HashSection } from "./hash-section";
import { VariablesSection } from "../variables-section/variables-section";
import { useFrame } from "../frames-state";

export function DevelopMain() {
  const _variableDefs = useFrame("main").variableDefs;
  if (Object.keys(_variableDefs).length === 0) {
    return <div></div>;
  }

  return (
    <>
      <HashSection />
      <VariablesSection />
    </>
  );
}
