import { css } from "@emotion/css";
import { BatchConfigurePane } from "../batch/batch-configure-pane";
import { DevelopFrame } from "./develop-frame";
import { DevelopPane } from "./develop-pane";
import { Screen } from "../navigation";

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

export function DevelopScreen({ screen }: { screen: Screen }) {
  return (
    <div className={styles}>
      <DevelopFrame />
      {screen[1] === "configure-batch" ? (
        <BatchConfigurePane />
      ) : (
        <DevelopPane />
      )}
    </div>
  );
}
