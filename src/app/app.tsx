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
  overflow: hidden;

  > * {
    max-height: 100%;
    overflow: auto;
  }
`;

export function App() {
  const _settings = useSnapshot(settings);

  return isEmbedded() ? (
    <Panes />
  ) : (
    <div className={styles}>
      {_settings.pane[0] === "batch" ? (
        <BatchPreview batchId={_settings.pane[1]} />
      ) : (
        <DevelopFrame />
      )}
      <Panes />
    </div>
  );
}
