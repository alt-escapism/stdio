import { css } from "@emotion/css";

const styles = css`
  border: 1px solid #fff;
  border-radius: 3px;
  flex-shrink: 0;
  height: 1em;
  width: 1em;
`;

export function ColorSwatch({ color }: { color: string }) {
  return <div className={styles} style={{ background: color }}></div>;
}

const RGB_HSL_PATTERN = /^(rgba?|hsla?)\((.+)\)$/;
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

export function isColorString(str: string): boolean {
  const matches = RGB_HSL_PATTERN.exec(str) ?? HEX_PATTERN.exec(str);
  return !!matches;
}
