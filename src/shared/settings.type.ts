export type Settings = {
  // Values are stored as strings;
  // validation and casting should be done before use.
  variables: Record<string, string>;
  recents: Record<string, string[]>;
  background: "light" | "dark";
  autoReload: boolean;
  pane: Pane;
};

export type Pane = "develop" | "batch";
