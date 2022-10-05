import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Button, ButtonGroup } from "../generic-ui/button";
import { SUBHEADER_BG_COLOR } from "../generic-ui/styles";
import { Toolbar } from "../generic-ui/toolbar";
import { reload } from "../reload";
import { resetLockedVariables, settings } from "../settings-state";

const style = css`
  background: ${SUBHEADER_BG_COLOR};

  label {
    display: flex;
    align-items: center;
  }
`;

export function ReloadToolbar() {
  const _settings = useSnapshot(settings);

  return (
    <Toolbar className={style}>
      <label>
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
    </Toolbar>
  );
}
