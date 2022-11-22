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

const sliderStyles = css`
  padding-left: 10px;
  width: calc(100% - 60px - ${LOCK_SIZE + 4}px);
`;

const inputStyles = {
  withSlider: css`
    padding-right: 4px;
    text-align: right;
    width: 60px;
  `,
  withoutSlider: css`
    padding-right: 40px;
  `,
};

export function NumberInput({ variable }: { variable: NumberVar }) {
  const { name, value } = variable;
  const _settings = useSnapshot(settings);
  const lockedValue = getValueOfType(_settings.variables[name], "Number");
  const [text, setText] = useDerivedState<string>(
    () => String(lockedValue ?? value),
    [lockedValue]
  );
  const lockStyles = useLockStyles(variable);
  const hasSlider = isMinMaxNumberVar(variable);

  return (
    <InputContainer>
      {hasSlider ? (
        <div className={sliderStyles}>
          <NumberSlider variable={variable} />
        </div>
      ) : null}
      <Input
        className={cx(
          hasSlider ? inputStyles.withSlider : inputStyles.withoutSlider,
          lockStyles
        )}
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
      <SettingLockButton variable={variable} />
    </InputContainer>
  );
}

type MinMaxNumberVar = NumberVar & Required<Pick<NumberVar, "min" | "max">>;

function isMinMaxNumberVar(variable: NumberVar): variable is MinMaxNumberVar {
  return (
    variable.min != null &&
    variable.max != null &&
    variable.min !== variable.max
  );
}

function NumberSlider({ variable }: { variable: MinMaxNumberVar }) {
  const { name, value } = variable;
  const _settings = useSnapshot(settings);
  const lockedValue = getValueOfType(_settings.variables[name], "Number");
  const approxMax = (1 - Number.EPSILON) * variable.max;
  const transform = variable.transform ?? ((x) => x);

  return (
    <Slider
      value={[lockedValue ?? value]}
      onValueChange={(value) => {
        settings.variables[name] = {
          type: "Number",
          name,
          value: transform(value[0]),
        };
      }}
      onValueCommit={() => {
        autoReload(variable);
      }}
      min={transform(variable.min)}
      max={transform(approxMax)}
      step={Math.min(1, (variable.max - variable.min) / 100)}
    />
  );
}
