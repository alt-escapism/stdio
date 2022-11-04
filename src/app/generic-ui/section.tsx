import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  margin: 24px;

  h2 {
    font-size: 17px;
    font-weight: normal;
    letter-spacing: 3px;
    margin: 0 0 8px;
    text-transform: uppercase;
  }
`;

export function Section({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
