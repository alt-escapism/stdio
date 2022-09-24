import { NumberVar } from "../../shared/variables.type";
import { last } from "../last";
import { ColorSwatch } from "../setting-controls/color-swatch";
import { TreeNode } from "./variable-tree";

export function getCombinedValue(nodes: TreeNode[]) {
  const keyedChildren: Record<string, TreeNode> = Object.fromEntries(
    nodes.map((node) => [last(node.name.split("/")), node])
  );

  if (
    nodesMatchExactly(keyedChildren, {
      h: isNumberVar,
      s: isNumberVar,
      l: isNumberVar,
    }) ||
    nodesMatchExactly(keyedChildren, {
      h: isNumberVar,
      s: isNumberVar,
      l: isNumberVar,
      a: isNumberVar,
    })
  ) {
    const h = (keyedChildren.h as NumberVar).value;
    const s = (keyedChildren.s as NumberVar).value;
    const l = (keyedChildren.l as NumberVar).value;
    const a = (keyedChildren.a as NumberVar | undefined)?.value ?? 1;
    const color = `hsla(${Math.floor(h)}, ${s.toFixed(2)}%, ${l.toFixed(
      2
    )}%, ${a.toFixed(2)})`;
    return <ColorSwatch color={color} />;
  }

  if (
    nodesMatchExactly(keyedChildren, {
      r: isNumberVar,
      g: isNumberVar,
      b: isNumberVar,
    }) ||
    nodesMatchExactly(keyedChildren, {
      r: isNumberVar,
      g: isNumberVar,
      b: isNumberVar,
      a: isNumberVar,
    })
  ) {
    const r = (keyedChildren.r as NumberVar).value;
    const g = (keyedChildren.g as NumberVar).value;
    const b = (keyedChildren.b as NumberVar).value;
    const a = (keyedChildren.a as NumberVar | undefined)?.value ?? 1;
    const color = `rgba(${Math.floor(r)}, ${Math.floor(g)}%, ${Math.floor(
      b
    )}%, ${a.toFixed(2)})`;
    return <ColorSwatch color={color} />;
  }
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

function isNumberVar(node: TreeNode): node is NumberVar {
  return node.type === "Number";
}
