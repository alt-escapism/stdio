import { css } from "@emotion/css";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { useSnapshot } from "valtio";
import { VariableDef } from "../../inject/variable-def.type";
import { autoReload } from "../reload";
import { lock, settings, unlock } from "../settings-state";
import { useLockStyles } from "./use-lock-styles";

export const buttonStyles = css`
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

export const unlockedButtonStyles = css`
  color: rgba(255, 255, 255, 0.3);
  height: 100%;

  :hover {
    color: #fff;
  }
`;

export function SettingLockButton({ variable }: { variable: VariableDef }) {
  const lockStyles = useLockStyles(variable);
  const _settings = useSnapshot(settings);
  const lockedValue = _settings.variables[variable.name];
  const isLocked = lockedValue != null;

  return (
    <button
      className={buttonStyles}
      onClick={() => {
        if (isLocked) {
          unlock(variable);
        } else {
          lock(variable);
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
