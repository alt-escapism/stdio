import { css, cx } from "@emotion/css";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { useTooltip } from "./use-tooltip";

const X_PADDING = 12;

const BORDER_RADIUS = 4;

export const buttonStyles = css`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${BORDER_RADIUS}px;
  color: inherit;
  display: inline-flex;
  font-family: inherit;
  font-size: 17px;
  gap: 8px;
  justify-content: center;
  min-height: 32px;
  min-width: 24px;
  opacity: 0.8;
  padding: 6px ${X_PADDING}px;
  max-width: 100%;

  > svg {
    flex-shrink: 0;
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

const primaryStyles = css`
  font-weight: bold;
`;

export function Button(
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    primary?: boolean;
    tip?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
  }
) {
  const { className, tip, primary, onClick, disabled, ...otherProps } = props;
  const { tooltip, getTriggerProps } = useTooltip(tip);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx(buttonStyles, primary ? primaryStyles : null, className)}
        onClick={
          onClick
            ? (e) => {
                const returnValue = onClick(e);
                if (returnValue instanceof Promise) {
                  setIsSubmitting(true);
                  returnValue.finally(() => {
                    setIsSubmitting(false);
                  });
                }
              }
            : undefined
        }
        disabled={disabled == null ? isSubmitting : disabled}
        {...otherProps}
        {...getTriggerProps()}
      />
      {tooltip}
    </>
  );
}

const buttonGroupStyles = css`
  display: inline-flex;
  margin: 0 ${-X_PADDING}px;
`;

export function ButtonGroup({ children }: { children: ReactNode }) {
  return <div className={buttonGroupStyles}>{children}</div>;
}

const splitButtonStyles = css`
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${BORDER_RADIUS}px;
  display: inline-flex;
  margin: 0 ${X_PADDING}px;

  > :first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  > :last-child {
    button {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      padding-left: 3px;
      padding-right: 3px;
    }
  }
`;

const dividerStyles = css`
  background: rgba(255, 255, 255, 0.1);
  height: 100%;
  width: 1px;
`;

export function SplitButton({
  button,
  dropdown,
}: {
  button: ReactNode;
  dropdown: ReactNode;
}) {
  return (
    <div className={splitButtonStyles}>
      {button}
      <div className={dividerStyles} />
      {dropdown}
    </div>
  );
}
