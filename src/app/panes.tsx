import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BatchPreparePane } from "./batch/batch-prepare-pane";
import { BatchRunningPane } from "./batch/batch-running-pane";
import { DevelopPane } from "./develop/develop-pane";
import { settings } from "./settings-state";

const styles = css`
  background: #101010;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

export function Panes() {
  const _settings = useSnapshot(settings);

  return (
    <div className={styles}>
      {_settings.pane === "develop" ? (
        <DevelopPane />
      ) : _settings.pane === "batch" ? (
        <BatchPreparePane />
      ) : _settings.pane[0] === "batch" ? (
        <BatchRunningPane batchId={_settings.pane[1]} />
      ) : null}
    </div>
  );
}
