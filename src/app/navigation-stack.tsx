import { css } from "@emotion/css";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { BatchPreview } from "./batch/batch-preview";
import { ImageViewer } from "./batch/image-viewer";
import { DevelopScreen } from "./develop/develop-screen";
import { Dialog } from "./generic-ui/dialog";
import { navigation, popScreen } from "./navigation";

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
      {_navigation.stack.map((screen, i) => {
        if (screen[0] === "develop") {
          return <DevelopScreen key={screen[0]} screen={screen} />;
        } else if (screen[0] === "batch") {
          return <BatchPreview key={screen[0]} batchId={screen[1]} />;
        } else if (screen[0] === "image") {
          return <ImageViewer key={screen[0]} imageId={screen[1]} />;
        } else if (screen[0] === "dialog") {
          return (
            <Dialog
              key={screen[0]}
              body={screen[1].body}
              actions={screen[1].actions}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
