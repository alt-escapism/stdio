import { css } from "@emotion/css";
import { useMemo } from "react";
import { useFrame } from "../frames-state";
import { EmptyMessage } from "../generic-ui/empty-message";
import { Section } from "../generic-ui/section";
import { buildVariableTree } from "./variable-tree";
import { TreeNodeView } from "./variable-tree-view";

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export function VariablesSection() {
  const _variableDefs = useFrame("main").variableDefs;
  const tree = useMemo(
    () =>
      buildVariableTree(
        Object.values(_variableDefs).filter(
          (variable) => variable.type !== "Hash"
        )
      ),
    [_variableDefs]
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
