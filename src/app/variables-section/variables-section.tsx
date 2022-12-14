import { css } from "@emotion/css";
import { useMemo } from "react";
import { useFrame } from "../frames-state";
import { Section } from "../generic-ui/section";
import { VariableTreeView } from "./variable-tree-view";

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export function VariablesSection() {
  const _variables = useFrame("main").variables;
  const nonHashVariables = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(_variables).filter(
          ([_, variable]) => variable.type !== "Hash"
        )
      ),
    [_variables]
  );

  return (
    <Section title="Variables">
      <div className={containerStyles}>
        <VariableTreeView
          variables={nonHashVariables}
          emptyMessage={
            <>
              Add variables here by calling stdio's <code>random()</code>{" "}
              function with a unique variable name – e.g.{" "}
              <code>random("count")</code>.
            </>
          }
        />
      </div>
    </Section>
  );
}
