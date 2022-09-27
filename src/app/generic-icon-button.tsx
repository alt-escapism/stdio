import { css, cx } from "@emotion/css";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTooltip } from "./use-tooltip";

const styles = css`
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  padding: 0;
  line-height: 0;
  min-width: 24px;
  opacity: 0.8;
  width: 1.5em;

  :hover {
    opacity: 1;
  }
`;

export function GenericIconButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { tip?: ReactNode }
) {
  const { className, tip, ...otherProps } = props;
  const { tooltip, getTriggerProps } = useTooltip(tip);

  return (
    <>
      <button
        type="button"
        className={cx(styles, className)}
        {...otherProps}
        {...getTriggerProps()}
      />
      {tooltip}
    </>
  );
}
