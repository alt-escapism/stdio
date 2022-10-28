import { css, cx } from "@emotion/css";
import { FC, forwardRef, InputHTMLAttributes, RefAttributes } from "react";

const styles = css`
  background: inherit;
  border: none;
  border-radius: 4px;
  color: inherit;
  font-family: inherit;
  font-size: 18px;
  height: 30px;
  outline: none;
  padding: 6px 12px;
  width: 100%;

  ::selection {
    background: #555;
  }
`;

export const Input: FC<
  InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
> = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cx(styles, className)}
      spellCheck={false}
      {...props}
    />
  );
});
