import { css } from "@emotion/css";
import { SettingInput } from "../setting-controls/setting-input";
import { SettingListbox } from "../setting-controls/setting-listbox";
import { VariableLabel } from "./variable-label";
import { TreeNode, VariableTree } from "./variable-tree";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useMemo, useState } from "react";
import { GroupLockButton } from "./group-lock-button";
import { ColorSwatch } from "../setting-controls/color-swatch";
import { NumberVar } from "../../shared/variables.type";

const treeLabelStyles = css`
  align-items: center;
  color: #aaa;
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr) auto;
  gap: 12px;

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
    const keyedChildren: Record<string, TreeNode> = Object.fromEntries(
      tree.children.map((node) => [last(node.name.split("/")), node])
    );
    if (
      nodesMatchExactly(keyedChildren, {
        h: (node) => node.type === "Number",
        s: (node) => node.type === "Number",
        l: (node) => node.type === "Number",
      })
    ) {
      const h = (keyedChildren.h as NumberVar).value;
      const s = (keyedChildren.s as NumberVar).value;
      const l = (keyedChildren.l as NumberVar).value;
      const color = `hsl(${Math.round(h)}, ${s.toFixed(2)}%, ${l.toFixed(2)}%)`;
      return <ColorSwatch color={color} />;
    }
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

function nodesMatchExactly(
  keyedNodes: { [key: string]: TreeNode },
  matches: { [basename: string]: (node: TreeNode) => boolean }
): boolean {
  const matchEntries = Object.entries(matches);
  if (Object.keys(keyedNodes).length !== matchEntries.length) {
    return false;
  }
  return matchEntries.every(
    ([basename, predicate]) =>
      keyedNodes[basename] && predicate(keyedNodes[basename])
  );
}
