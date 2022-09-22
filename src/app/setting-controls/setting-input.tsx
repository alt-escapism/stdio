import { css, cx } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Variable } from "../../shared/variables.type";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

const styles = css`
  display: flex;
  position: relative;
`;

const inputStyles = css`
  background: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
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
    <div className={styles}>
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
    </div>
  );
}
