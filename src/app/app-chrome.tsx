import { css, injectGlobal } from "@emotion/css";
import { ReactNode } from "react";

injectGlobal`
  @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap");

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }
`;

const styles = css`
  color: #fff;
  font-family: "Inconsolata", monospace;
  font-size: 18px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;

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
