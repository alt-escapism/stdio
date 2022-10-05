import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Button } from "../generic-ui/button";
import { rendering } from "../rendering-state";
import { BiHelpCircle } from "react-icons/bi";
import { Toolbar } from "../generic-ui/toolbar";

const styles = css`
  border-top: 1px solid #222;
`;

export function DevelopFooter() {
  const _rendering = useSnapshot(rendering);

  return (
    <Toolbar className={styles}>
      {_rendering.durationMs == null ? (
        <>
          Rendering...{" "}
          <Button
            tip={
              <span>
                Call <code>fxpreview()</code> when rendering is done
              </span>
            }
          >
            <BiHelpCircle />
          </Button>
        </>
      ) : (
        `Rendered in ${(_rendering.durationMs / 1000).toFixed(2)}s`
      )}
    </Toolbar>
  );
}
