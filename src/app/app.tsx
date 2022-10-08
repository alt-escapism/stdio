import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BatchPreview } from "./batch/batch-preview";
import { DevelopFrame } from "./develop/develop-frame";
import { isEmbedded } from "./is-embedded";
import { Panes } from "./panes";
import { settings } from "./settings-state";

const styles = css`
  display: grid;
  grid-template-columns: 1fr minmax(320px, 25%);
  height: 100%;
`;

export function App() {
  const _settings = useSnapshot(settings);
  const runningBatch = _settings.pane === "batch" && _settings.runningBatch;

  return isEmbedded() ? (
    <Panes />
  ) : (
    <div className={styles}>
      {runningBatch ? <BatchPreview id={runningBatch.id} /> : <DevelopFrame />}
      <Panes />
    </div>
  );
}
