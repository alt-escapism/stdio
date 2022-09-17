import { css, cx } from "@emotion/css";
import { ButtonHTMLAttributes } from "react";

const styles = css`
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  padding: 0;
  line-height: 0;
  min-width: 24px;
`;

export function GenericIconButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { className, ...otherProps } = props;
  return (
    <button type="button" className={cx(styles, className)} {...otherProps} />
  );
}
