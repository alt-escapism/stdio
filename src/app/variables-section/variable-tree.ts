import { VariableSnapshot, Variable } from "../../inject/variable-def.type";

export type VariableTree<T extends VariableSnapshot = Variable> = {
  type: "Tree";
  name: string;
  children: TreeNode<T>[];
  subTrees: Record<string, VariableTree<T>>;
};

export type TreeNode<T extends VariableSnapshot = Variable> =
  | T
  | VariableTree<T>;

export function buildVariableTree<T extends VariableSnapshot>(
  variables: T[]
): VariableTree<T> {
  const tree: VariableTree<T> = {
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

export function getLeafNodes<T extends VariableSnapshot>(
  tree: VariableTree<T>,
  leaves: T[] = []
) {
  tree.children.forEach((node) => {
    if (node.type !== "Tree") {
      leaves.push(node);
    } else {
      getLeafNodes(node, leaves);
    }
  });
  return leaves;
}
