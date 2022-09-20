import { css, injectGlobal } from "@emotion/css";
import { ReactNode } from "react";

injectGlobal`
  @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap");
`;

const styles = css`
  background: #101010;
  color: #fff;
  font-family: "Inconsolata", monospace;
  font-size: 18px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: normal;
  }

  > main {
    overflow: auto;
  }
`;

export function AppChrome({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
