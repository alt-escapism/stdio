import { css } from "@emotion/css";

const styles = css`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  height: 6px;
  width: 100%;

  > div {
    background: #ccc;
    border-radius: 3px;
    height: 100%;
    min-width: 6px;
  }
`;

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className={styles}>
      <div style={{ width: (progress * 100).toFixed(2) + "%" }} />
    </div>
  );
}
