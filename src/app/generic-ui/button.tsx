import { css, cx } from "@emotion/css";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTooltip } from "./use-tooltip";

const X_PADDING = 12;

const styles = css`
  background: none;
  border: none;
  border-radius: 4px;
  color: inherit;
  display: inline-block;
  font-family: inherit;
  font-size: 17px;
  min-width: 24px;
  opacity: 0.8;
  padding: 8px ${X_PADDING}px;

  > svg {
    font-size: 18px;
    vertical-align: bottom;
  }

  :hover {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  &[disabled] {
    background: none;
    opacity: 0.2;
  }
`;

export function Button(
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

const buttonGroupStyles = css`
  display: inline-block;
  margin: 0 ${-X_PADDING}px;
`;

export function ButtonGroup({ children }: { children: ReactNode }) {
  return <div className={buttonGroupStyles}> {children} </div>;
}
