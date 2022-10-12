import { css, cx } from "@emotion/css";
import { useSnapshot } from "valtio";
import { NumberVar } from "../../inject/variable-def.type";
import { Input } from "../generic-ui/input";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { useDerivedState } from "../use-derived-state";
import { getValueOfType } from "../variables";
import { SettingControlContainer } from "./setting-control-container";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

const styles = css`
  padding-right: 36px;
`;

export function NumberInput({ variable }: { variable: NumberVar }) {
  const { name, value } = variable;
  const _settings = useSnapshot(settings);
  const lockedValue = getValueOfType(_settings.variables[name], "Number");
  const [text, setText] = useDerivedState<string>(
    () => String(lockedValue ?? value),
    [lockedValue]
  );
  const lockStyles = useLockStyles(variable);

  return (
    <SettingControlContainer>
      <Input
        className={cx(styles, lockStyles)}
        value={text ?? lockedValue ?? value}
        onChange={(e) => {
          const str = e.target.value;
          setText(str);
          if (str.trim() && !isNaN(Number(str))) {
            settings.variables[name] = {
              type: "Number",
              name,
              value: Number(str),
            };
          }
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
