import { css } from "@emotion/css";
import { HTMLProps, ReactNode } from "react";

const styles = css`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function VariableLabel({
  name,
  depth,
  icon,
  ...labelProps
}: {
  name: string;
  depth: number;
  icon?: ReactNode;
} & HTMLProps<HTMLLabelElement>) {
  return (
    <label
      className={styles}
      style={{ paddingLeft: depth * 18 }}
      {...labelProps}
    >
      {icon}
      <span>{name}</span>
    </label>
  );
}
