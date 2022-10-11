import { css, cx } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { HTMLAttributes, useEffect, useMemo } from "react";
import { getDb } from "../db";

const styles = css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  > img {
    max-height: 100%;
    max-width: 100%;
  }
`;

export function ImagePreview({
  imageId,
  className,
  ...props
}: { imageId: string } & HTMLAttributes<HTMLDivElement>) {
  const image = useLiveQuery(() => getDb().Image.get(imageId));
  const url = useMemo(
    () => (image ? URL.createObjectURL(image.image) : null),
    [image]
  );
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className={cx(styles, className)} {...props}>
      {url && <img src={url} alt="Preview" />}
    </div>
  );
}
