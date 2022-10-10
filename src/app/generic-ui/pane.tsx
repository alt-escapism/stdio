import { css } from "@emotion/css";
import { ReactNode } from "react";
import { Header } from "./header";
import { SUBHEADER_BG_COLOR } from "./styles";
import { Toolbar } from "./toolbar";

const styles = css`
  background: #101010;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;
`;

const toolbarStyles = css`
  background: ${SUBHEADER_BG_COLOR};
`;

const mainStyles = css`
  height: 100%;
  overflow: auto;
`;

const footerStyles = css`
  border-top: 1px solid #222;
`;

export function Pane({
  header,
  toolbar,
  main,
  footer,
}: {
  header?: ReactNode;
  toolbar?: ReactNode;
  main?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className={styles}>
      {header ? <Header>{header}</Header> : <div />}
      {toolbar ? (
        <Toolbar className={toolbarStyles}>{toolbar}</Toolbar>
      ) : (
        <div />
      )}
      <div className={mainStyles}>{main}</div>
      {footer ? <div className={footerStyles}>{footer}</div> : null}
    </div>
  );
}
