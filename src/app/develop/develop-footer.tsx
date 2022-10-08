import { css } from "@emotion/css";
import { Button } from "../generic-ui/button";
import { useFrame } from "../frames-state";
import { BiHelpCircle } from "react-icons/bi";
import { Toolbar } from "../generic-ui/toolbar";

const styles = css`
  border-top: 1px solid #222;
`;

export function DevelopFooter() {
  const _frame = useFrame("main");

  return (
    <Toolbar className={styles}>
      {_frame.durationMs == null ? (
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
        `Rendered in ${(_frame.durationMs / 1000).toFixed(2)}s`
      )}
    </Toolbar>
  );
}
