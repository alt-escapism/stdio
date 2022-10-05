import { useSnapshot } from "valtio";
import { AppChrome } from "./app-chrome";
import { appState } from "./app-state";
import { BatchPane } from "./batch/batch-pane";
import { DevelopPane } from "./develop/develop-pane";

export function App() {
  const _appState = useSnapshot(appState);

  return (
    <AppChrome>
      {_appState.pane === "develop" ? <DevelopPane /> : <BatchPane />}
    </AppChrome>
  );
}
