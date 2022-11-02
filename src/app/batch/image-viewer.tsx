import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { DbObject, getDb } from "../db";
import { DownloadButton } from "../develop/download-button";
import { ToggleBackgroundButton } from "../develop/toggle-background-button";
import { ButtonGroup } from "../generic-ui/button";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { Splitter } from "../generic-ui/splitter";
import { NavigationBackButton } from "../navigation-back-buttons";
import { getBackgroundColor, settings } from "../settings-state";
import { getValueOfType } from "../variables";
import { buildVariableTree } from "../variables-section/variable-tree";
import { VariableTreeView } from "../variables-section/variable-tree-view";
import { ImagePreview } from "./image-preview";

export function ImageViewer({
  imageId,
  onPrev,
  onNext,
}: {
  imageId: string;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const imageMeta = useLiveQuery(
    () => getDb().ImageMeta.get(imageId),
    [imageId]
  );
  const _settings = useSnapshot(settings);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        onPrev?.();
      } else if (e.key === "ArrowRight") {
        onNext?.();
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [onNext, onPrev]);

  return (
    <Pane
      header={
        <>
          <Spacer>
            <NavigationBackButton />
            <span>
              {getValueOfType(imageMeta?.variables["fxhash"], "Hash") ?? ""}
            </span>
          </Spacer>
          <ButtonGroup>
            <DownloadButton
              getImage={async () => {
                const image = await getDb().Image.get(imageId);
                return image
                  ? {
                      image: image.image,
                      filename: getValueOfType(
                        imageMeta?.variables["fxhash"],
                        "Hash"
                      ),
                    }
                  : null;
              }}
            />
            <ToggleBackgroundButton />
          </ButtonGroup>
        </>
      }
      main={
        <Splitter
          main={
            <ImagePreview
              imageId={imageId}
              background={getBackgroundColor(_settings)}
            />
          }
          side={imageMeta ? <ImageMetaView imageMeta={imageMeta} /> : null}
        />
      }
    />
  );
}

function ImageMetaView({ imageMeta }: { imageMeta: DbObject["ImageMeta"] }) {
  const tree = buildVariableTree(Object.values(imageMeta.variables));

  return (
    <Pane
      main={
        <div style={{ padding: 24 }}>
          <VariableTreeView tree={tree} />
        </div>
      }
    />
  );
}
