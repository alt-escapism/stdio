import { css, cx } from "@emotion/css";
import { useSnapshot } from "valtio";
import { NumberVar } from "../../inject/variable-def.type";
import { Input } from "../generic-ui/input";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { useDerivedState } from "../use-derived-state";
import { getValueOfType } from "../variables";
import { InputContainer } from "../generic-ui/input-container";
import { LOCK_SIZE, SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";
import { Slider } from "../generic-ui/slider";

const withSliderStyles = css`
  width: 60px;
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
  const hasSlider =
    variable.min != null &&
    variable.max != null &&
    variable.min !== variable.max;

  return (
    <InputContainer>
      <Input
        className={cx({ [withSliderStyles]: hasSlider }, lockStyles)}
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            autoReload(variable);
          }
        }}
      />
      {hasSlider ? (
        <div style={{ paddingRight: LOCK_SIZE + 4, width: "100%" }}>
          <Slider
            value={[lockedValue ?? value]}
            onValueChange={(value) => {
              settings.variables[name] = {
                type: "Number",
                name,
                value: value[0],
              };
            }}
            onValueCommit={() => {
              autoReload(variable);
            }}
            min={variable.min}
            max={variable.max}
          />
        </div>
      ) : null}
      <SettingLockButton variable={variable} />
    </InputContainer>
  );
}
