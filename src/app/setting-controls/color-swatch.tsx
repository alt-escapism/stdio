import { css } from "@emotion/css";

const styles = css`
  height: 1em;
  width: 1em;
`;

export function ColorSwatch({ color }: { color: string }) {
  return <div className={styles} style={{ background: color }}></div>;
}
