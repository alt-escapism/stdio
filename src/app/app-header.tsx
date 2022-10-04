import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { LightDarkButton } from "./light-dark-button";
import stdioLogo from "./fx-stdio.svg";

const styles = css`
  align-items: center;
  background: #1e1e1e;
  box-sizing: content-box;
  display: flex;
  height: 1em;
  padding: 16px 24px;
  justify-content: space-between;

  img {
    height: 0.8em;
    margin-top: 1px;
  }

  h1 {
    line-height: 0;
  }
`;

const buttonPanelStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export function AppHeader() {
  return (
    <div className={styles}>
      <h1>
        <img src={stdioLogo} alt="fx(stdio)" />
      </h1>
      <div className={buttonPanelStyles}>
        <DownloadButton />
        <LightDarkButton />
      </div>
    </div>
  );
}
