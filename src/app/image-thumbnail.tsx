import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { rendering } from "./rendering-state";

const styles = css`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ImageThumbnail({ hash }: { hash: string }) {
  const _rendering = useSnapshot(rendering);
  const image = _rendering.thumbnails[hash] ? (
    <img src={_rendering.thumbnails[hash]} alt="Thumbnail" />
  ) : null;
  return <div className={styles}>{image}</div>;
}
