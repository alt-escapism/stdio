import { proxy } from "valtio";

export type Pane = "develop" | "batch";

export type AppState = {
  pane: Pane;
};

export const appState = proxy<AppState>({
  pane: "develop",
});
