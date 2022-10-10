import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Button, ButtonGroup } from "../generic-ui/button";
import { reload } from "../reload";
import { resetLockedVariables, settings } from "../settings-state";

const labelStyles = css`
  display: flex;
  align-items: center;
`;

export function ReloadToolbar() {
  const _settings = useSnapshot(settings);

  return (
    <>
      <label className={labelStyles}>
        <input
          type="checkbox"
          checked={_settings.autoReload}
          onChange={() => {
            settings.autoReload = !settings.autoReload;
          }}
        />
        &nbsp;<span>Auto-reload</span>
      </label>
      <ButtonGroup>
        <Button onClick={reload}>Reload</Button>
        <Button
          onClick={() => {
            resetLockedVariables();
            reload();
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </>
  );
}
