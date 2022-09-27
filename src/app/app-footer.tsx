import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { GenericIconButton } from "./generic-icon-button";
import { rendering } from "./rendering-state";
import { BiHelpCircle } from "react-icons/bi";

const styles = css`
  align-items: center;
  border-top: 1px solid #222;
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  font-size: 0.9em;
`;

export function AppFooter() {
  const _rendering = useSnapshot(rendering);

  return (
    <div className={styles}>
      {_rendering.durationMs == null ? (
        <>
          Rendering...{" "}
          <GenericIconButton
            tip={
              <span>
                Call <code>fxpreview()</code> when rendering is done
              </span>
            }
          >
            <BiHelpCircle />
          </GenericIconButton>
        </>
      ) : (
        `Rendered in ${(_rendering.durationMs / 1000).toFixed(2)}s`
      )}
    </div>
  );
}
