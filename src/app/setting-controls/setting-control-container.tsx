import { css, cx } from "@emotion/css";
import { FC, forwardRef, HTMLProps, RefAttributes } from "react";

const styles = css`
  position: relative;
  display: flex;
  width: calc(100% + 26px);
  margin: 0 -13px;
  border: 1px solid transparent;
  border-radius: 4px;

  :hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

export const SettingControlContainer: FC<
  HTMLProps<HTMLDivElement> & RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
  return <div {...props} className={cx(styles, props.className)} ref={ref} />;
});
