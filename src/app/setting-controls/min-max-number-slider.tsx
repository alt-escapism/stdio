import { useSnapshot } from "valtio";
import { NumberVar } from "../../inject/variable-def.type";
import { clamp } from "../clamp";
import { Slider } from "../generic-ui/slider";
import { autoReload } from "../reload";
import { settings } from "../settings-state";
import { getValueOfType } from "../variables";

export type MinMaxNumberVar = NumberVar &
  Required<Pick<NumberVar, "min" | "max">>;

export function isMinMaxNumberVar(
  variable: NumberVar
): variable is MinMaxNumberVar {
  return (
    variable.min != null &&
    variable.max != null &&
    variable.min !== variable.max
  );
}

function roundStep(n: number) {
  let exp = 0;
  while (Math.round(n) < 1 && n > 0) {
    exp--;
    n *= 10;
  }
  return Math.pow(10, exp);
}

export function getStep(min: number, max: number) {
  return Math.min(1, roundStep((max - min) / 100));
}

const STEPS = 100;

export function MinMaxNumberSlider({
  variable,
  includesMax,
}: {
  variable: MinMaxNumberVar;
  includesMax?: boolean;
}) {
  const { name, value } = variable;
  const _settings = useSnapshot(settings);
  const lockedValue = getValueOfType(_settings.variables[name], "Number");
  const transform = variable.transform ?? ((x) => x);
  let min: number = Number.MAX_VALUE;
  let max: number = Number.MIN_VALUE;
  let minValue = 0;
  let maxValue = 0;
  const step = (variable.max - variable.min) / STEPS;
  const steps = includesMax ? STEPS + 1 : STEPS;
  for (let i = 0; i < steps; i++) {
    const x = variable.min + i * step;
    const _x = transform(x);
    if (_x < min) {
      min = _x;
      minValue = x;
    }
    if (_x > max) {
      max = _x;
      maxValue = x;
    }
  }

  return (
    <Slider
      value={[lockedValue ?? value]}
      onValueChange={([value]) => {
        const position = clamp(0, 1, (value - min) / (max - min));
        settings.variables[name] = {
          type: "Number",
          name,
          value: transform(minValue + position * (maxValue - minValue)),
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
