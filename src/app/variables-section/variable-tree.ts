import { VariableDef } from "../../inject/variable-def.type";

export type VariableTree = {
  type: "Tree";
  name: string;
  children: TreeNode[];
  subTrees: Record<string, VariableTree>;
};

export type TreeNode = VariableDef | VariableTree;

export function buildVariableTree(variables: VariableDef[]): VariableTree {
  const tree: VariableTree = {
    name: "",
    type: "Tree",
    children: [],
    subTrees: {},
  };
  variables.forEach((variable) => {
    const parts = variable.name.split("/");
    let subTree = tree;
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      if (isLast) {
        subTree.children.push(variable);
      } else {
        if (!subTree.subTrees[part]) {
          subTree.subTrees[part] = {
            name: part,
            type: "Tree",
            children: [],
            subTrees: {},
          };
          subTree.children.push(subTree.subTrees[part]);
        }
        subTree = subTree.subTrees[part];
      }
    });
  });
  return tree;
}

export function getLeafNodes(tree: VariableTree, leaves: VariableDef[] = []) {
  tree.children.forEach((node) => {
    if (node.type !== "Tree") {
      leaves.push(node);
    } else {
      getLeafNodes(node, leaves);
    }
  });
  return leaves;
}
