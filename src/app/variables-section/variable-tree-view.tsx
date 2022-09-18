import { css } from "@emotion/css";
import { SettingInput } from "../setting-controls/setting-input";
import { SettingListbox } from "../setting-controls/setting-listbox";
import { VariableLabel } from "./variable-label";
import { TreeNode, VariableTree } from "./variable-tree";
import { last } from "lodash";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from "react";

const treeLabelStyles = css`
  color: #999;
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
      <div className={treeLabelStyles} onClick={toggleOpen}>
        <VariableLabel
          name={tree.name}
          depth={depth}
          icon={
            <span className={chevronStyles}>
              {isOpen ? <BiChevronDown /> : <BiChevronRight />}
            </span>
          }
        />
      </div>
      {isOpen &&
        tree.children.map((node) => (
          <TreeNodeView key={node.name} node={node} depth={depth + 1} />
        ))}
    </div>
  );
}

const variableStyles = css`
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr);
  gap: 12px;
  align-items: center;
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
