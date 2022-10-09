import { css, cx } from "@emotion/css";
import { HTMLAttributes } from "react";

const styles = css`
  color: #fff;
  font-family: "Inconsolata", monospace;
  font-size: 18px;
  height: 100%;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
  }
`;

export function AppStyles({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles, className)} {...props} />;
}
