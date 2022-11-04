import { css } from "@emotion/css";
import { VariableLabel } from "./variable-label";
import {
  VariableTreeNode,
  VariableTree,
  buildVariableTree,
} from "./variable-tree";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useMemo, useState } from "react";
import { GroupLockButton } from "./group-lock-button";
import { last } from "../last";
import { getCombinedValue } from "./get-combined-value";
import {
  Variables,
  VariableSnapshot,
  VariableSnapshots,
} from "../../inject/variable-def.type";
import { isWritable } from "../variables";
import { VariableInput } from "../setting-controls/variable-input";
import { VariableView } from "../setting-controls/variable-view";

const treeLabelStyles = css`
  align-items: center;
  color: #aaa;
  display: grid;
  grid-template-columns: calc(40% + 9px) minmax(0, 1fr) auto;
  gap: 12px;
  margin-left: -18px;
  margin-right: -12px;

  > button {
    font-size: 0.9em;
    width: 40px;
  }
`;

const chevronStyles = css`
  font-size: 0.8em;
  margin-top: 4px;
  width: 14px;
`;

const combinedValueStyles = css`
  padding-left: 13px;
`;

export function VariableTreeView({
  variables,
}: {
  variables: Variables | VariableSnapshots;
}) {
  const tree = useMemo(
    () => buildVariableTree(Object.values(variables)),
    [variables]
  );

  return (
    <>
      {tree.children.map((node) => (
        <TreeNodeView key={node.name} node={node} depth={0} />
      ))}
    </>
  );
}

const variableStyles = css`
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr);
  gap: 16px;
  align-items: center;

  :hover {
    color: #fff;
  }
`;

function TreeNodeView({
  node,
  depth,
}: {
  node: VariableTreeNode;
  depth: number;
}) {
  const { name, type } = node;

  if (type === "Tree") {
    return <SubTreeView tree={node} depth={depth} />;
  }

  const isNodeWritable = isWritable(node);

  return (
    <div className={variableStyles}>
      <VariableLabel name={last(name.split("/"))!} depth={depth} />
      {isNodeWritable ? (
        <VariableInput variable={node} />
      ) : (
        <VariableView variable={node} />
      )}
    </div>
  );
}

function SubTreeView<T extends VariableSnapshot>({
  tree,
  depth,
}: {
  tree: VariableTree<T>;
  depth: number;
}) {
  const combinedValue = useMemo(() => {
    return getCombinedValue(tree.children);
  }, [tree.children]);

  const [isOpen, setIsOpen] = useState(combinedValue == null);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div className={treeLabelStyles}>
        <VariableLabel
          name={tree.name}
          depth={depth}
          icon={
            <span className={chevronStyles}>
              {isOpen ? <BiChevronDown /> : <BiChevronRight />}
            </span>
          }
          onClick={toggleOpen}
        />
        <span className={combinedValueStyles}>{combinedValue}</span>
        <GroupLockButton tree={tree} />
      </div>
      <div style={{ display: isOpen ? "block" : "none" }}>
        {tree.children.map((node) => (
          <TreeNodeView key={node.name} node={node} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
