import { css, cx } from "@emotion/css";
import { HTMLAttributes } from "react";

const styles = css`
  align-items: center;
  box-sizing: content-box;
  display: flex;
  height: 1em;
  padding: 16px 24px;
  justify-content: space-between;
`;

export function Toolbar({
  children,
  className,
  ...otherProps
}: HTMLAttributes<HTMLDivElement> & {}) {
  return <div className={cx(styles, className)}>{children}</div>;
}
