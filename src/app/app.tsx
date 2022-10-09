import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { AppStyles } from "./app-styles";
import { BatchPreview } from "./batch/batch-preview";
import { DevelopFrame } from "./develop/develop-frame";
import { isEmbedded } from "./is-embedded";
import { Panes } from "./panes";
import { settings } from "./settings-state";

const styles = css`
  display: grid;
  grid-template-columns: 1fr minmax(340px, 25%);
  height: 100%;
  overflow: hidden;

  > * {
    max-height: 100%;
    overflow: auto;
  }
`;

export function App() {
  const _settings = useSnapshot(settings);

  const content = isEmbedded() ? (
    <Panes />
  ) : _settings.pane[0] === "batch" ? (
    <BatchPreview batchId={_settings.pane[1]} />
  ) : (
    <div className={styles}>
      <DevelopFrame />
      <Panes />
    </div>
  );

  return <AppStyles>{content}</AppStyles>;
}
