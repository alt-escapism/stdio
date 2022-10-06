import { useSnapshot } from "valtio";
import { AppChrome } from "./app-chrome";
import { BatchPane } from "./batch/batch-pane";
import { DevelopPane } from "./develop/develop-pane";
import { settings } from "./settings-state";

export function App() {
  const _settings = useSnapshot(settings);

  return (
    <AppChrome>
      {_settings.pane === "develop" ? <DevelopPane /> : <BatchPane />}
    </AppChrome>
  );
}
