export type Settings = {
  // Values are stored as strings;
  // validation and casting should be done before use.
  variables: Record<string, string>;
  recents: Record<string, string[]>;
  background: "light" | "dark";
  autoReload: boolean;
  batches: Record<string, Batch>;
};

export type Pane = "develop" | "batch" | ["batch", string];

export type Batch = {
  id: string;
  createdAt: string;
  windowWidth: number;
  windowHeight: number;
  total: number;
  done: number;
  variables: Record<string, string>;
};
