import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { HashSection } from "./hash-section";
import { VariablesSection } from "../variables-section/variables-section";
import { variables } from "../variables-state";

const styles = css`
  overflow: auto;
`;

export function DevelopMain() {
  const _variables = useSnapshot(variables);
  if (Object.keys(_variables).length === 0) {
    return <div></div>;
  }

  return (
    <div className={styles}>
      <HashSection />
      <VariablesSection />
    </div>
  );
}
