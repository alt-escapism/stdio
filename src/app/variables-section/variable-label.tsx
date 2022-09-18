import { css } from "@emotion/css";
import { ReactNode } from "react";

const styles = css`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function VariableLabel({
  name,
  depth,
  icon,
}: {
  name: string;
  depth: number;
  icon?: ReactNode;
}) {
  return (
    <label className={styles} style={{ paddingLeft: depth * 18 }}>
      {icon}
      <span>{name}</span>
    </label>
  );
}
