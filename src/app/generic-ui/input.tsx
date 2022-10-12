import { css, cx } from "@emotion/css";
import { InputHTMLAttributes } from "react";

const styles = css`
  background: inherit;
  border: none;
  border-radius: 4px;
  color: inherit;
  font-family: inherit;
  font-size: 18px;
  height: 30px;
  padding: 6px 12px;
  width: 100%;
`;

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={cx(styles, className)} spellCheck={false} {...props} />
  );
}
