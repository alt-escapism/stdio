import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BatchPane } from "./batch/batch-pane";
import { DevelopPane } from "./develop/develop-pane";
import { settings } from "./settings-state";

const styles = css`
  background: #101010;
  color: #fff;
  font-family: "Inconsolata", monospace;
  font-size: 18px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;

  * {
    box-sizing: border-box;
  }
`;

export function Panes() {
  const _settings = useSnapshot(settings);

  return (
    <div className={styles}>
      {_settings.pane === "develop" ? <DevelopPane /> : <BatchPane />}
    </div>
  );
}
