import { css } from "@emotion/css";
import { HashSection } from "./hash-section";
import { VariablesSection } from "../variables-section/variables-section";
import { useFrame } from "../frames-state";

const styles = css`
  overflow: auto;
`;

export function DevelopMain() {
  const _variableDefs = useFrame("main").variableDefs;
  if (Object.keys(_variableDefs).length === 0) {
    return <div></div>;
  }

  return (
    <div className={styles}>
      <HashSection />
      <VariablesSection />
    </div>
  );
}
