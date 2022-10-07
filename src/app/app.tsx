import { css } from "@emotion/css";
import { DevelopFrame } from "./develop/develop-frame";
import { isEmbedded } from "./is-embedded";
import { Panes } from "./panes";

const styles = css`
  display: grid;
  grid-template-columns: 1fr minmax(320px, 25%);
  height: 100%;
`;

export function App() {
  return isEmbedded() ? (
    <Panes />
  ) : (
    <div className={styles}>
      <DevelopFrame />
      <Panes />
    </div>
  );
}
