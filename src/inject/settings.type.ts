import { VariableSnapshots } from "./variable-def.type";

export type Settings = {
  version: number;
  variables: VariableSnapshots;
  recents: Record<string, string[]>;
  background: "light" | "dark";
  autoReload: boolean;
};

export type Pane = "develop" | "batch" | ["batch", string];

export type Batch = {
  id: string;
  createdAt: string;
  windowWidth: number;
  windowHeight: number;
  total: number;
  done: number;
  variables: VariableSnapshots;
};
