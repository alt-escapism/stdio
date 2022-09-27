import { css, cx } from "@emotion/css";
import { HTMLProps } from "react";

const styles = css`
  color: #fff;
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

export function SettingControlContainer(props: HTMLProps<HTMLDivElement>) {
  return <div {...props} className={cx(styles, props.className)} />;
}
