import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  display: grid;
  height: 100%;
  overflow: hidden;

  > * {
    max-height: 100%;
    overflow: auto;
  }
`;

export function Splitter({ main, side }: { main: ReactNode; side: ReactNode }) {
  return (
    <div
      className={styles}
      style={{
        gridTemplateColumns: side == null ? "1fr" : "1fr minmax(340px, 25%)",
      }}
    >
      <div>{main}</div>
      {side == null ? null : <div>{side}</div>}
    </div>
  );
}
