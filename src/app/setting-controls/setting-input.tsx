import { useSnapshot } from "valtio";
import { Variable } from "../../inject/variables.type";
import { Input } from "../generic-ui/input";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { SettingControlContainer } from "./setting-control-container";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

export function SettingInput({ variable }: { variable: Variable }) {
  const _settings = useSnapshot(settings);
  const lockedValue = _settings.variables[variable.name];
  const activeValue = lockedValue ?? String(variable.value);
  const lockStyles = useLockStyles(variable);

  return (
    <SettingControlContainer>
      <Input
        className={lockStyles}
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
