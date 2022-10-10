import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo } from "react";
import { DbObject, getDb } from "../db";

const styles = css`
  align-items: center;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;

  :hover {
    border-color: white;
  }

  > img {
    max-height: 100%;
    max-width: 100%;
  }
`;

export function ImagePreview({
  imageMeta,
}: {
  imageMeta: DbObject["ImageMeta"];
}) {
  const image = useLiveQuery(() => getDb().Image.get(imageMeta.id));
  const url = useMemo(
    () => (image ? URL.createObjectURL(image.image) : null),
    [image]
  );
  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return <div className={styles}>{url && <img src={url} alt="Preview" />}</div>;
}
