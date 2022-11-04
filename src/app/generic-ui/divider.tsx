import { css } from "@emotion/css";

const styles = css`
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  height: 20px;
  width: 1px;
`;

export function Divider() {
  return <div className={styles}></div>;
}
