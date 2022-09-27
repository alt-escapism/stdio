import { css, cx } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Variable } from "../../shared/variables.type";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { SettingControlContainer } from "./setting-control-container";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

const inputStyles = css`
  background: inherit;
  border: none;
  border-radius: 4px;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  padding: 6px 52px 6px 12px;
  width: 100%;
`;

export function SettingInput({ variable }: { variable: Variable }) {
  const _settings = useSnapshot(settings);
  const lockedValue = _settings.variables[variable.name];
  const activeValue = lockedValue ?? String(variable.value);
  const lockStyles = useLockStyles(variable);

  return (
    <SettingControlContainer>
      <input
        className={cx(inputStyles, lockStyles)}
        value={activeValue}
        onChange={(e) => {
          settings.variables[variable.name] = e.target.value;
        }}
        spellCheck={false}
        onBlur={() => {
          autoReload(variable);
        }}
      />
      <SettingLockButton variable={variable} />
    </SettingControlContainer>
  );
}
