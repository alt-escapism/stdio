import { css } from "@emotion/css";
import { SettingInput } from "../setting-controls/setting-input";
import { SettingListbox } from "../setting-controls/setting-listbox";
import { VariableLabel } from "./variable-label";
import { TreeNode, VariableTree } from "./variable-tree";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { GroupLockButton } from "./group-lock-button";
import { Variable } from "../../shared/variables.type";

const treeLabelStyles = css`
  color: #aaa;
  display: flex;
  justify-content: space-between;

  :hover {
    color: #fff;
  }

  > button {
    font-size: 0.9em;
    width: 40px;
  }
`;

const chevronStyles = css`
  margin-left: -4px;
  margin-top: 4px;
`;

export function VariableTreeView({
  tree,
  depth,
}: {
  tree: VariableTree;
  depth: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
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

const variableStyles = css`
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  color: #aaa;

  :hover {
    color: #fff;
  }
`;

export function TreeNodeView({
  node,
  depth,
}: {
  node: TreeNode;
  depth: number;
}) {
  const { name, type } = node;

  if (type === "Tree") {
    return <VariableTreeView tree={node} depth={depth} />;
  }

  return (
    <div key={name} className={variableStyles}>
      <VariableLabel name={last(name.split("/"))!} depth={depth} />
      {type === "Array" || type === "Object" ? (
        <SettingListbox variable={node} />
      ) : (
        <SettingInput variable={node} />
      )}
    </div>
  );
}

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
