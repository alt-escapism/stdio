import { css } from "@emotion/css";
import { ComponentProps, ReactNode } from "react";
import { Button } from "./button";
import { SUBHEADER_BG_COLOR } from "./styles";

const styles = css`
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
`;

const contentStyles = css`
  background: ${SUBHEADER_BG_COLOR};
  border-radius: 8px;
  line-height: 1.6;
  max-width: calc(100% - 48px);
  padding: 24px;
  width: 400px;
`;

const actionStyles = css`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const headerStyles = css`
  font-weight: bold;
  margin-bottom: 8px;
`;

export function Dialog({
  body,
  actions,
  header,
}: {
  body: ReactNode;
  actions: ComponentProps<typeof Button>[];
  header?: ReactNode;
}) {
  return (
    <div className={styles}>
      <div className={contentStyles}>
        {header ? <div className={headerStyles}>{header}</div> : null}
        <div>{body}</div>
        <div className={actionStyles}>
          {actions.map((action, index) => (
            <Button key={index} full {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}
