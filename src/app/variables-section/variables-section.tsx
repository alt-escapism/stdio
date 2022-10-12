import { css } from "@emotion/css";
import { useMemo } from "react";
import { useFrame } from "../frames-state";
import { EmptyMessage } from "../generic-ui/empty-message";
import { Section } from "../generic-ui/section";
import { buildVariableTree } from "./variable-tree";
import { VariableTreeView } from "./variable-tree-view";

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export function VariablesSection() {
  const _variables = useFrame("main").variables;
  const tree = useMemo(
    () =>
      buildVariableTree(
        Object.values(_variables).filter((variable) => variable.type !== "Hash")
      ),
    [_variables]
  );

  return (
    <Section title="Variables">
      {tree.children.length ? (
        <div className={containerStyles}>
          <VariableTreeView tree={tree} />
        </div>
      ) : (
        <EmptyMessage>
          Add variables here by calling stdio's <code>random()</code> function
          with a unique variable name – e.g. <code>random("count")</code>.
        </EmptyMessage>
      )}
    </Section>
  );
}
