import { css, cx } from "@emotion/css";
import { Root, Track, Range, Thumb, SliderProps } from "@radix-ui/react-slider";

const rootStyles = css`
  align-items: center;
  display: flex;
  height: 24px;
  position: relative;
  touch-action: none;
  user-select: none;
  width: 100%;
`;

const trackStyles = css`
  background: #333;
  border-radius: 1.5px;
  flex-grow: 1;
  height: 3px;
  position: relative;
`;

const rangeStyles = css`
  background: white;
  border-radius: 1.5px;
  height: 100%;
  position: absolute;
`;

const thumbStyles = css`
  --size: 14px;
  background: white;
  border-radius: calc(var(--size) / 2);
  display: block;
  height: var(--size);
  outline: none;
  width: var(--size);

  &:hover,
  &:focus {
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

export function Slider({ className, min, max, value, ...props }: SliderProps) {
  let _value = value;
  if (_value != null) {
    if (min != null) {
      _value = _value.map((v) => Math.max(min, v));
    }
    if (max != null) {
      _value = _value.map((v) => Math.min(max, v));
    }
  }

  return (
    <Root
      className={cx(rootStyles, className)}
      min={min}
      max={max}
      value={_value}
      {...props}
    >
      <Track className={trackStyles}>
        <Range className={rangeStyles} />
      </Track>
      <Thumb className={thumbStyles} />
    </Root>
  );
}
