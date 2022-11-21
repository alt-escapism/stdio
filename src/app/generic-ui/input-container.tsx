import { css, cx } from "@emotion/css";
import { FC, forwardRef, HTMLProps, RefAttributes } from "react";

const styles = css`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  margin: 0 -13px;
  position: relative;
  width: calc(100% + 26px);

  :hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  :focus-within {
    border-color: rgba(255, 255, 255, 1);
  }
`;

export const InputContainer: FC<
  HTMLProps<HTMLDivElement> & RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
  return <div {...props} className={cx(styles, props.className)} ref={ref} />;
});
