import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { BatchPreview } from "./batch/batch-preview";
import { ImageViewer } from "./batch/image-viewer";
import { DevelopScreen } from "./develop/develop-screen";
import { navigation } from "./navigation";

const styles = css`
  height: 100%;
  position: relative;
  width: 100%;

  > * {
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;
  }
`;

export function NavigationStack() {
  const _navigation = useSnapshot(navigation);

  return (
    <div className={styles}>
      {_navigation.stack.map((screen, i) => {
        if (screen[0] === "develop") {
          return <DevelopScreen key={screen[0]} screen={screen} />;
        } else if (screen[0] === "batch") {
          return <BatchPreview key={screen[0]} batchId={screen[1]} />;
        } else if (screen[0] === "image") {
          return <ImageViewer key={screen[0]} imageId={screen[1]} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}
