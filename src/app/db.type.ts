export type Thumbnail = { hash: string; image: Blob };

export type Image = { id: string; image: Blob };

export type ImageMeta = {
  id: string;
  createdAt: string;
  batchId: string;
  variables: Record<string, string>;
};
