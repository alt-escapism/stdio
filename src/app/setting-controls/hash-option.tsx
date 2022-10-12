import { css } from "@emotion/css";
import { ImageThumbnail } from "../image-thumbnail";

const styles = css`
  align-items: center;
  display: flex;
  gap: 12px;
  max-width: 100%;
  overflow: hidden;

  > span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export function HashOption({ hash }: { hash: string }) {
  return (
    <div className={styles}>
      <ImageThumbnail hash={hash} />
      <span>{hash}</span>
    </div>
  );
}
