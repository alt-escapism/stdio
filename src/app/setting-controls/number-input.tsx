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
import {
  GaussianNumberSlider,
  isGaussianNumberVar,
} from "./gaussian-number-slider";
import { ReactElement } from "react";
import { isMinMaxNumberVar, MinMaxNumberSlider } from "./min-max-number-slider";

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

  let slider: ReactElement | undefined;
  if (isMinMaxNumberVar(variable)) {
    slider = <MinMaxNumberSlider variable={variable} />;
  } else if (isGaussianNumberVar(variable)) {
    slider = (
      <MinMaxNumberSlider
        variable={{
          ...variable,
          min: variable.mean - 3 * variable.sd,
          max: variable.mean + 3 * variable.sd,
        }}
        includesMax
      />
    );
  }

  return (
    <InputContainer>
      {slider ? <div className={sliderStyles}>{slider}</div> : null}
      <Input
        className={cx(
          slider ? inputStyles.withSlider : inputStyles.withoutSlider,
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
