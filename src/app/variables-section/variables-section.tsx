import { css } from "@emotion/css";
import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { EmptyMessage } from "../generic-ui/empty-message";
import { Section } from "../generic-ui/section";
import { variables } from "../variables-state";
import { buildVariableTree } from "./variable-tree";
import { TreeNodeView } from "./variable-tree-view";

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export function VariablesSection() {
  const _variables = useSnapshot(variables);
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
          {tree.children.map((node) => (
            <TreeNodeView key={node.name} node={node} depth={0} />
          ))}
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
