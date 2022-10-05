import { css, cx } from "@emotion/css";
import { HTMLAttributes } from "react";

const styles = css`
  align-items: center;
  display: inline-flex;
  gap: 12px;
`;

export function Spacer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles, className)} {...props} />;
}
