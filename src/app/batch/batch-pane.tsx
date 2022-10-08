import { useSnapshot } from "valtio";
import { settings } from "../settings-state";
import { BatchPreparePane } from "./batch-prepare-pane";
import { BatchRunningPane } from "./batch-running-pane";

export function BatchPane() {
  const _settings = useSnapshot(settings);
  const runningBatch = _settings.runningBatch;

  return runningBatch ? (
    <BatchRunningPane id={runningBatch.id} />
  ) : (
    <BatchPreparePane />
  );
}
