import { css } from "@emotion/css";
import { SettingInput } from "../setting-controls/setting-input";
import { SettingListbox } from "../setting-controls/setting-listbox";
import { VariableLabel } from "./variable-label";
import { TreeNode, VariableTree } from "./variable-tree";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useMemo, useState } from "react";
import { GroupLockButton } from "./group-lock-button";
import { last } from "../last";
import { getCombinedValue } from "./get-combined-value";

const treeLabelStyles = css`
  align-items: center;
  color: #aaa;
  display: grid;
  grid-template-columns: calc(40% + 9px) minmax(0, 1fr) auto;
  gap: 12px;
  margin-left: -18px;
  margin-right: -12px;

  :hover {
    color: #fff;
  }

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
  tree,
  depth,
}: {
  tree: VariableTree;
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

const variableStyles = css`
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr);
  gap: 16px;
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
