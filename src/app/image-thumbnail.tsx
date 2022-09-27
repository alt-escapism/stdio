import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { thumbnails } from "./thumbnails-state";

const styles = css`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ImageThumbnail({ hash }: { hash: string }) {
  const _thumbnails = useSnapshot(thumbnails);
  const image = _thumbnails[hash] ? (
    <img src={_thumbnails[hash]} alt="Thumbnail" />
  ) : null;
  return <div className={styles}>{image}</div>;
}
