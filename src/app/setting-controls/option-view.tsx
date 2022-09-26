import { css } from "@emotion/css";
import { ReactNode } from "react";
import { ColorSwatch } from "./color-swatch";

const styles = css`
  display: flex;
  gap: 8px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function OptionView({
  optionKey,
  options,
}: {
  optionKey: string;
  options: readonly unknown[] | Record<string, unknown>;
}) {
  const value = (options as unknown as Record<string, unknown>)[optionKey];
  const strValue = String(value);
  let displayValue: ReactNode;
  if (!Array.isArray(options)) {
    displayValue = optionKey;
  } else if (isColorString(strValue)) {
    displayValue = (
      <>
        <ColorSwatch color={strValue} />
        {strValue}
      </>
    );
  } else {
    const isValuePrimitive =
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean";
    displayValue = isValuePrimitive ? String(value) : optionKey;
  }

  return <span className={styles}>{displayValue}</span>;
}

const RGB_HSL_PATTERN = /^(rgba?|hsla?)\((.+)\)$/;
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

function isColorString(str: string): boolean {
  const matches = RGB_HSL_PATTERN.exec(str) ?? HEX_PATTERN.exec(str);
  return !!matches;
}
