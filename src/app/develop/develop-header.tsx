import { css } from "@emotion/css";
import { DownloadButton } from "./download-button";
import { ToggleBackgroundButton } from "./toggle-background-button";
import stdioLogo from "./fx-stdio.svg";
import { BatchGenerateButton } from "./batch-generate-button";
import { ButtonGroup } from "../generic-ui/button";
import { DevOnly } from "../generic-ui/dev-only";
import { captureImage } from "../capture";
import { getHash } from "../frames-state";

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
        <DevOnly>
          <BatchGenerateButton />
        </DevOnly>
        <DownloadButton
          getImage={() =>
            captureImage("main").then((image) =>
              image ? { image, filename: getHash("main") } : null
            )
          }
        />
        <ToggleBackgroundButton />
      </ButtonGroup>
    </>
  );
}
