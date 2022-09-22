import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  display: block;
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
      <div style={{ width: "1em", height: "1em", background: strValue }}></div>
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

const COLOR_STRING_PATTERN = /^(rgba?|hsla?)\((.+)\)$/;

function isColorString(str: string): boolean {
  const matches = COLOR_STRING_PATTERN.exec(str);
  return !!matches;
}