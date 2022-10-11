import { css } from "@emotion/css";
import { ReactNode } from "react";

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

export function Splitter({ main, side }: { main: ReactNode; side: ReactNode }) {
  return (
    <div className={styles}>
      <div>{main}</div>
      <div>{side}</div>
    </div>
  );
}
