import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { ToggleBackgroundButton } from "./toggle-background-button";
import stdioLogo from "./fx-stdio.svg";
import { BatchGenerateButton } from "./batch-generate-button";
import { ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { DevOnly } from "../generic-ui/dev-only";

const logoStyles = css`
  font-size: 18px;

  > img {
    height: 0.8em;
    vertical-align: middle;
  }
`;

export function DevelopHeader() {
  return (
    <Header>
      <h1 className={logoStyles}>
        <img src={stdioLogo} alt="fx(stdio)" />
      </h1>
      <ButtonGroup>
        <DevOnly>
          <BatchGenerateButton />
        </DevOnly>
        <DownloadButton />
        <ToggleBackgroundButton />
      </ButtonGroup>
    </Header>
  );
}
