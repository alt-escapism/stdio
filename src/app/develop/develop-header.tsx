import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { LightDarkButton } from "./light-dark-button";
import stdioLogo from "./fx-stdio.svg";
import { BatchGenerateButton } from "./batch-generate-button";
import { ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";

const logoStyles = css`
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
        <BatchGenerateButton />
        <DownloadButton />
        <LightDarkButton />
      </ButtonGroup>
    </Header>
  );
}
