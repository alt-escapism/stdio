import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { ToggleBackgroundButton } from "./toggle-background-button";
import stdioLogo from "./fx-stdio.svg";
import { BatchGenerateButton } from "./batch-generate-button";
import { ButtonGroup } from "../generic-ui/button";
import { captureImage } from "../capture";
import { getHash } from "../frames-state";
import { isEmbedded } from "../is-embedded";
import { config } from "../../inject/config";
import { ShareButton } from "./share-button";

const logoStyles = css`
  > img {
    height: 0.8em;
    vertical-align: middle;
  }
`;

export function DevelopHeader() {
  return (
    <>
      <h1 className={logoStyles}>
        <img src={stdioLogo} alt="fx(stdio)" />
      </h1>
      <ButtonGroup>
        {isEmbedded() || config.playground ? null : <BatchGenerateButton />}
        {config.playground ? (
          <ShareButton />
        ) : (
          <DownloadButton
            getImage={() =>
              captureImage("main").then((image) =>
                image ? { image, filename: getHash("main") } : null
              )
            }
          />
        )}
        <ToggleBackgroundButton />
      </ButtonGroup>
    </>
  );
}
