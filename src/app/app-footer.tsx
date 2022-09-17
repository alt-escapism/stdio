import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { rendering } from "./rendering-state";

const styles = css`
  border-top: 1px solid #222;
  padding: 16px 24px;
  font-size: 0.9em;
`;

export function AppFooter() {
  const _rendering = useSnapshot(rendering);

  return (
    <div className={styles}>
      <div>
        {_rendering.durationMs == null
          ? "Rendering..."
          : `Rendered in ${(_rendering.durationMs / 1000).toFixed(2)}s`}
      </div>
    </div>
  );
}
