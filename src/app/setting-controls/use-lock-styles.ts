import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Variable } from "../../shared/variables.type";
import { settings } from "../settings-state";

export const lockedColor = "#1c91b8";

export const lockedStyles = css`
  color: ${lockedColor};
`;

export function useLockStyles(variable: Variable) {
  const _settings = useSnapshot(settings);
  const lockedValue = _settings.variables[variable.name];
  const isLocked = lockedValue != null;
  return isLocked ? lockedStyles : undefined;
}
