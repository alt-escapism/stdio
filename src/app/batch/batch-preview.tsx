import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { memo } from "react";
import RenderIfVisible from "react-render-if-visible";
import { useSnapshot } from "valtio";
import { DbObject, getDb } from "../db";
import { ButtonGroup } from "../generic-ui/button";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { popScreen, pushScreen } from "../navigation";
import { NavigationBackButton } from "../navigation-back-buttons";
import { settings } from "../settings-state";
import { BatchRenderer } from "./batch-renderer";
import { formatBatchDate } from "./batch-summary-row";
import { DeleteBatchButton } from "./delete-batch-button";
import { ImagePreview } from "./image-preview";
import { ThumbnailSizePicker } from "./thumbnail-size-picker";

const imageGridStyles = (previewSize: number) => css`
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;

  > * {
    border: 2px solid transparent;
    box-sizing: content-box;
    height: ${previewSize}px;
    overflow: hidden;
    width: ${previewSize}px;

    :hover {
      border-color: white;
    }
  }
`;

export const BatchPreview = memo(({ batchId }: { batchId: string }) => {
  const _settings = useSnapshot(settings);
  const imagesMeta = useLiveQuery(() =>
    getDb()
      .ImageMeta.where("batchId")
      .equals(batchId)
      .reverse()
      .sortBy("createdAt")
  );

  return (
    <Pane
      header={
        <>
          <Spacer>
            <NavigationBackButton />
            <BatchTitle batchId={batchId} />
          </Spacer>
          <ButtonGroup>
            <Spacer>
              <ThumbnailSizePicker />
              <div />
              <DeleteBatchButton
                batchId={batchId}
                onSuccess={() => popScreen(["batch", batchId])}
              />
            </Spacer>
          </ButtonGroup>
        </>
      }
      main={
        <div className={imageGridStyles(_settings.batchThumbnailSize)}>
          <BatchRenderer batchId={batchId} />
          {imagesMeta?.map((imageMeta, i) => (
            <RenderIfVisible stayRendered key={imageMeta.id}>
              <ImagePreview
                imageId={imageMeta.id}
                imageSize={imageMeta.thumbnailSizes[0]}
                onClick={getImageViewerHandler(imagesMeta, i)}
              />
            </RenderIfVisible>
          ))}
        </div>
      }
    />
  );
});

function getImageViewerHandler(imagesMeta: DbObject["ImageMeta"][], i: number) {
  return () => {
    const { id } = imagesMeta[i];
    pushScreen(
      [
        "image",
        {
          imageId: id,
          onNext:
            i < imagesMeta.length - 1
              ? getImageViewerHandler(imagesMeta, i + 1)
              : undefined,
          onPrev: i > 0 ? getImageViewerHandler(imagesMeta, i - 1) : undefined,
        },
      ],
      true
    );
  };
}

const batchTitleStyles = css`
  color: #aaa;
  display: flex;
  font-size: 17px;
  gap: 24px;

  > :first-child {
    color: white;
    font-size: 18px;
  }

  > :nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding-left: 24px;
  }
`;

function BatchTitle({ batchId }: { batchId: string }) {
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  if (!batch) return null;

  return (
    <div className={batchTitleStyles}>
      <span>
        {batch.rendered < batch.total
          ? `Generating ${batch.rendered + 1} of ${batch.total}...`
          : `Batch of ${batch.total}`}
      </span>
      <span>
        {batch.windowWidth}x{batch.windowHeight}
      </span>
      <span>Started {formatBatchDate(new Date(batch.createdAt))}</span>
    </div>
  );
}
