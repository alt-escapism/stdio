import { css, cx } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { HTMLAttributes, useEffect, useMemo } from "react";
import { DbObject, getDb } from "../db";

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
  imageSize,
  className,
  onNext,
  onPrev,
  ...props
}: {
  imageId: string;
  imageSize?: number;
  onNext?: () => void;
  onPrev?: () => void;
} & HTMLAttributes<HTMLDivElement>) {
  const image = useLiveQuery(async () => {
    let image: DbObject["Image"] | undefined;
    if (imageSize !== undefined) {
      image = await getDb().ImageThumbnail.get([imageId, imageSize]);
    }
    if (image == null) {
      image = await getDb().Image.get(imageId);
    }
    return image;
  }, [imageId, imageSize]);
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
