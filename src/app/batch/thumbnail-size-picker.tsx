import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BATCH_THUMBNAIL_SIZES } from "../../inject/settings-storage";
import { Button } from "../generic-ui/button";
import { settings } from "../settings-state";

const styles = css`
  padding: 0 12px;
`;

export function ThumbnailSizePicker() {
  const _settings = useSnapshot(settings);

  return (
    <div className={styles}>
      {BATCH_THUMBNAIL_SIZES.map((size, index) => {
        const iconSize =
          18 * ((index / (BATCH_THUMBNAIL_SIZES.length - 1)) * 0.3 + 0.7);
        return (
          <Button
            key={size}
            onClick={() => {
              settings.batchThumbnailSize = size;
            }}
            style={{
              verticalAlign: "bottom",
              padding: 6,
              width: 32,
            }}
          >
            <div
              style={{
                border: "1px solid white",
                borderRadius: 2,
                width: iconSize,
                height: iconSize,
                background:
                  _settings.batchThumbnailSize === size ? "white" : "none",
                verticalAlign: "bottom",
              }}
            />
          </Button>
        );
      })}
    </div>
  );
}
