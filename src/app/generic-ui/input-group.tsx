import { css, cx } from "@emotion/css";
import { HTMLAttributes } from "react";

const styles = css`
  color: #aaa;

  > label {
    align-items: center;
    display: grid;
    grid-template-columns: 40% minmax(0, 1fr);
    gap: 16px;
    height: 32px;

    :hover {
      color: #fff;
    }
  }

  input {
    color: white;
  }
`;

export function InputGroup({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles, className)} {...props}></div>;
}
