import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  color: #999;
  font-size: 0.9em;
  line-height: 1.8;
  padding: 8px 0;
  font-style: italic;
`;

export function EmptyMessage({ children }: { children?: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
