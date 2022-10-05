import { css } from "@emotion/css";
import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useFloating, flip, offset, shift } from "@floating-ui/react-dom";

const styles = css`
  background: #ccc;
  border-radius: 4px;
  color: #000;
  font-size: 16px;
  line-height: 1.8;
  padding: 4px 8px;
  z-index: 1;
`;

const TOOLTIP_DELAY = 500;

export function useTooltip(tip: ReactNode) {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip(), offset(8), shift({ padding: 8 })],
  });
  const timerRef = useRef<number>();

  return {
    tooltip:
      open && tip ? (
        <div
          className={styles}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
          ref={floating}
        >
          {tip}
        </div>
      ) : null,

    getTriggerProps() {
      return {
        ref: reference,
        onMouseEnter: (e: MouseEvent) => {
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, TOOLTIP_DELAY);
        },
        onMouseLeave: (e: MouseEvent) => {
          window.clearTimeout(timerRef.current);
          setOpen(false);
        },
      };
    },
  };
}
