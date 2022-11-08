import { css } from "@emotion/css";
import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { getBackgroundColor, settings } from "../settings-state";

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
  const _settings = useSnapshot(settings);

  return (
    <div
      className={styles}
      style={{
        gridTemplateColumns: side == null ? "1fr" : "1fr minmax(340px, 25%)",
      }}
    >
      <div style={{ background: getBackgroundColor(_settings.background) }}>
        {main}
      </div>
      {side == null ? null : <div>{side}</div>}
    </div>
  );
}
