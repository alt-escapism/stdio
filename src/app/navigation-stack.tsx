import { css } from "@emotion/css";
import { Fragment, useEffect } from "react";
import { useSnapshot } from "valtio";
import { BatchPreview } from "./batch/batch-preview";
import { ImageViewer } from "./batch/image-viewer";
import { DevelopScreen } from "./develop/develop-screen";
import { flattenStack, navigation, popScreen } from "./navigation";

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

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      const hasModifier = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
      if (!hasModifier && e.key === "Escape") {
        popScreen();
      }
    }
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className={styles}>
      {flattenStack(_navigation.stack).map(({ screen }, i) => {
        return (
          <Fragment key={i}>
            {(() => {
              if (
                screen[0] === "develop" ||
                screen[0] === "develop/configure-batch"
              ) {
                return <DevelopScreen screen={screen} />;
              } else if (screen[0] === "batch") {
                return <BatchPreview batchId={screen[1]} />;
              } else if (screen[0] === "image") {
                return <ImageViewer {...screen[1]} />;
              } else if (screen[0] === "dialog") {
                return screen[1];
              } else {
                return null;
              }
            })()}
          </Fragment>
        );
      })}
    </div>
  );
}
