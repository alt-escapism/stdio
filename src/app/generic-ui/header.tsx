import { css, cx } from "@emotion/css";
import { HTMLAttributes } from "react";
import { HEADER_BG_COLOR } from "./styles";
import { Toolbar } from "./toolbar";

const styles = css`
  background: ${HEADER_BG_COLOR};
  font-size: 18px;
`;

export function Header({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <Toolbar className={cx(styles, className)} {...props} />;
}
