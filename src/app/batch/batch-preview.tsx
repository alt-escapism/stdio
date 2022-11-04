import { css } from "@emotion/css";
import { useLiveQuery } from "dexie-react-hooks";
import { memo, useState } from "react";
import { BiDetail } from "react-icons/bi";
import RenderIfVisible from "react-render-if-visible";
import { useSnapshot } from "valtio";
import { DbObject, getDb } from "../db";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Divider } from "../generic-ui/divider";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { Splitter } from "../generic-ui/splitter";
import { popScreen, pushScreen } from "../navigation";
import { NavigationBackButton } from "../navigation-back-buttons";
import { settings } from "../settings-state";
import { BatchDetail } from "./batch-detail";
import { BatchRenderer } from "./batch-renderer";
import { formatBatchDate } from "./batch-summary-row";
import { DeleteBatchButton } from "./delete-batch-button";
import { ImageMetaView } from "./image-meta-view";
import { ImagePreview } from "./image-preview";
import { SaveBatchButton } from "./save-batch-button";
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
  const [imageMetaInSidePane, setImageMetaInSidePane] =
    useState<DbObject["ImageMeta"]>();

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
              <Divider />
              <div>
                <SaveBatchButton batchId={batchId} />
                <DeleteBatchButton
                  batchId={batchId}
                  onSuccess={() => popScreen(["batch", batchId])}
                />
              </div>
              <Divider />
              <Button
                tip={
                  _settings.isBatchSidebarOpen ? "Hide details" : "Show details"
                }
                active={_settings.isBatchSidebarOpen}
                onClick={() => {
                  settings.isBatchSidebarOpen = !settings.isBatchSidebarOpen;
                }}
              >
                <BiDetail />
              </Button>
            </Spacer>
          </ButtonGroup>
        </>
      }
      main={
        <Splitter
          main={
            <div className={imageGridStyles(_settings.batchThumbnailSize)}>
              <BatchRenderer batchId={batchId} />
              {imagesMeta?.map((imageMeta, i) => (
                <RenderIfVisible stayRendered key={imageMeta.id}>
                  <ImagePreview
                    imageId={imageMeta.id}
                    imageSize={imageMeta.thumbnailSizes[0]}
                    onClick={getImageViewerHandler(imagesMeta, i)}
                    onMouseEnter={() => setImageMetaInSidePane(imageMeta)}
                    onMouseLeave={() => setImageMetaInSidePane(undefined)}
                  />
                </RenderIfVisible>
              ))}
            </div>
          }
          side={
            !_settings.isBatchSidebarOpen ? null : imageMetaInSidePane ? (
              <ImageMetaView imageMeta={imageMetaInSidePane} />
            ) : (
              <BatchDetail batchId={batchId} />
            )
          }
        />
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
  align-items: center;
  color: #aaa;
  display: flex;
  font-size: 17px;
  gap: 24px;

  > :first-child {
    color: white;
    font-size: 18px;
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
      <Divider />
      <span>
        {batch.windowWidth}x{batch.windowHeight}
      </span>
      <span>Started {formatBatchDate(new Date(batch.createdAt))}</span>
    </div>
  );
}
