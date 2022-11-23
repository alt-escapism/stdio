import { css } from "@emotion/css";
import { HTMLProps, ReactNode } from "react";

const styles = css`
  align-items: center;
  color: #aaa;
  display: flex;
  gap: 4px;
  height: 32px;

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
