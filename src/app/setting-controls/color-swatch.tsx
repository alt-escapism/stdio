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
