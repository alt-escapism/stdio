import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { reload } from "./reload";
import { resetLockedVariables, settings } from "./settings-state";

const style = css`
  align-items: center;
  background: #333;
  border-bottom: 1px solid #222;
  display: flex;
  font-size: 0.9em;
  gap: 16px;
  justify-content: space-between;
  padding: 8px 24px;

  button {
    background: none;
    border: 1px solid #444;
    border-radius: 4px;
    color: #999;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    padding: 4px 8px;

    &:hover {
      color: #eee;
    }
  }

  label {
    display: flex;
    align-items: center;
  }
`;

const buttonGroupStyles = css`
  display: flex;
  gap: 8px;
`;

export function ReloadToolbar() {
  const _settings = useSnapshot(settings);

  return (
    <div className={style}>
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
      <div className={buttonGroupStyles}>
        <button onClick={reload}>Reload</button>
        <button
          onClick={() => {
            resetLockedVariables();
            reload();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
