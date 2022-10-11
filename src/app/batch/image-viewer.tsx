import { useLiveQuery } from "dexie-react-hooks";
import { DbObject, getDb } from "../db";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { Splitter } from "../generic-ui/splitter";
import { NavigationBackButton } from "../navigation-back-buttons";
import { ImagePreview } from "./image-preview";

export function ImageViewer({ imageId }: { imageId: string }) {
  const imageMeta = useLiveQuery(() => getDb().ImageMeta.get(imageId));

  return (
    <Pane
      header={
        <>
          <Spacer>
            <NavigationBackButton />
            {imageMeta?.variables["fxhash"] ?? ""}
          </Spacer>
        </>
      }
      main={
        <Splitter
          main={<ImagePreview imageId={imageId} />}
          side={imageMeta ? <ImageMetaView imageMeta={imageMeta} /> : null}
        />
      }
    />
  );
}

function ImageMetaView({ imageMeta }: { imageMeta: DbObject["ImageMeta"] }) {
  return (
    <div style={{ padding: 24 }}>
      {Object.entries(imageMeta.variables).map(([name, value]) => {
        return (
          <div
            key={name}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {name}: {value}
          </div>
        );
      })}
    </div>
  );
}
