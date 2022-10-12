import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  display: flex;
  gap: 8px;
  overflow: hidden;
  text-align: left;

  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
`;

export function OptionView({ children }: { children: ReactNode }) {
  return <span className={styles}>{children}</span>;
}
