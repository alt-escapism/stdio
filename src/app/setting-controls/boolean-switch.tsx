import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BooleanVar } from "../../inject/variable-def.type";
import { InputContainer } from "../generic-ui/input-container";
import { Switch } from "../generic-ui/switch";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { SettingLockButton } from "./setting-lock-button";

const containerStyles = css`
  height: 32px;
  padding: 0 32px 0 10px;
`;

export function BooleanSwitch({ variable }: { variable: BooleanVar }) {
  const _settings = useSnapshot(settings);
  const value =
    getValueOfType(_settings.variables[variable.name], "Boolean") ??
    variable.value;

  return (
    <InputContainer className={containerStyles}>
      <Switch
        checked={value}
        onCheckedChange={(checked) => {
          settings.variables[variable.name] = {
            type: "Boolean",
            name: variable.name,
            value: checked,
          };
          setTimeout(() => {
            autoReload(variable);
          }, 200);
        }}
      />
      <SettingLockButton variable={variable} />
    </InputContainer>
  );
}
