import { css } from "@emotion/css";
import { Root, Thumb, SwitchProps } from "@radix-ui/react-switch";

const SWITCH_HEIGHT = 22;
const SWITCH_WIDTH = 48;
const THUMB_SIZE = 12;
const THUMB_X = (SWITCH_HEIGHT - THUMB_SIZE) / 2;

const rootStyles = css`
  background: none;
  border: 1px solid #555;
  border-radius: 9999px;
  height: ${SWITCH_HEIGHT}px;
  margin-left: -1px;
  padding: 0;
  position: relative;
  transition: all 150ms;
  width: ${SWITCH_WIDTH}px;

  &[data-state="checked"] {
    border-color: #666;
    background: #666;
  }

  &:hover,
  &:focus {
    border-color: #888;
  }

  &[data-state="checked"]:hover,
  &[data-state="checked"]:focus {
    background: #888;
  }
`;

const thumbStyles = css`
  background: #fff;
  border-radius: 9999px;
  display: block;
  height: ${THUMB_SIZE}px;
  transition: transform 150ms ease-out;
  transform: translateX(${THUMB_X}px);
  width: ${THUMB_SIZE}px;

  &[data-state="checked"] {
    transform: translateX(${SWITCH_WIDTH - THUMB_SIZE - THUMB_X}px);
  }
`;

export function Switch(props: SwitchProps) {
  return (
    <Root className={rootStyles} {...props}>
      <Thumb className={thumbStyles} />
    </Root>
  );
}
