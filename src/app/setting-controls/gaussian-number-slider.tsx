import { useSnapshot } from "valtio";
import { NumberVar } from "../../inject/variable-def.type";
import { Slider } from "../generic-ui/slider";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { getStep } from "./min-max-number-slider";

export type GaussianNumberVar = NumberVar &
  Required<Pick<NumberVar, "mean" | "sd">>;

export function isGaussianNumberVar(
  variable: NumberVar
): variable is GaussianNumberVar {
  return variable.mean != null && variable.sd != null && variable.sd !== 0;
}

function roundNearest(unit: number, n: number) {
  return Math.round(n / unit) * unit;
}

export function GaussianNumberSlider({
  variable,
}: {
  variable: GaussianNumberVar;
}) {
  const { name, value } = variable;
  const _settings = useSnapshot(settings);
  const lockedValue = getValueOfType(_settings.variables[name], "Number");
  const transform = variable.transform ?? ((x) => x);
  const _min = transform(variable.mean - 3 * variable.sd);
  const _max = transform(variable.mean + 3 * variable.sd);
  const step = getStep(_min, _max);
  const min = roundNearest(step, _min);
  const max = roundNearest(step, _max);

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
      min={min}
      max={max}
      step={step}
    />
  );
}
