import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { LightDarkButton } from "./light-dark-button";

const styles = css`
  align-items: center;
  background: #1e1e1e;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;

  h1 {
    letter-spacing: 2px;
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
      <h1>fx(stdio)</h1>
      <div className={buttonPanelStyles}>
        <DownloadButton />
        <LightDarkButton />
      </div>
    </div>
  );
}
