import { css } from "@emotion/css";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { useSnapshot } from "valtio";
import { Variable } from "../../shared/variables.type";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { useLockStyles } from "./use-lock-styles";

const buttonStyles = css`
  background: none;
  border: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
  line-height: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
`;

const unlockedButtonStyles = css`
  color: rgba(255, 255, 255, 0.3);
`;

export function SettingLockButton({ variable }: { variable: Variable }) {
  const lockStyles = useLockStyles(variable);
  const _settings = useSnapshot(settings);
  const lockedValue = _settings.variables[variable.name];
  const isLocked = lockedValue != null;

  return (
    <button
      className={buttonStyles}
      onClick={() => {
        if (isLocked) {
          delete settings.variables[variable.name];
        } else {
          settings.variables[variable.name] = String(variable.value);
        }
        autoReload(variable);
      }}
    >
      {isLocked ? (
        <VscLock className={lockStyles} />
      ) : (
        <VscUnlock className={unlockedButtonStyles} />
      )}
    </button>
  );
}
