import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { useSnapshot } from "valtio";
import { DbObject, getDb } from "../db";
import { reloadDevelopFrame } from "../develop/develop-frame";
import { DownloadButton } from "../develop/download-button";
import { ToggleBackgroundButton } from "../develop/toggle-background-button";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { Splitter } from "../generic-ui/splitter";
import { popScreen } from "../navigation";
import { NavigationBackButton } from "../navigation-back-buttons";
import {
  getBackgroundColor,
  lock,
  resetLockedVariables,
  settings,
} from "../settings-state";
import { getValueOfType } from "../variables";
import { VariableTreeView } from "../variables-section/variable-tree-view";
import { ImageMetaView } from "./image-meta-view";
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
            <TitleHash
              hash={
                getValueOfType(imageMeta?.variables["fxhash"], "Hash") ?? ""
              }
            />
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

function TitleHash({ hash }: { hash?: string }) {
  if (!hash) {
    return null;
  }

  return (
    <>
      <span>{hash}</span>
      <ButtonGroup>
        <Button
          tip="Use this hash"
          onClick={() => {
            resetLockedVariables();
            lock({
              type: "Hash",
              name: "fxhash",
              value: hash,
            });
            reloadDevelopFrame();
            popScreen(["develop"]);
          }}
        >
          <BsBoxArrowRight />
        </Button>
      </ButtonGroup>
    </>
  );
}
