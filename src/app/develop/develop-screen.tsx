import { BatchConfigurePane } from "../batch/batch-configure-pane";
import { DevelopFrame } from "./develop-frame";
import { DevelopPane } from "./develop-pane";
import { Screen } from "../navigation";
import { Splitter } from "../generic-ui/splitter";

export function DevelopScreen({ screen }: { screen: Screen }) {
  return (
    <Splitter
      main={<DevelopFrame />}
      side={
        screen[1] === "configure-batch" ? (
          <BatchConfigurePane />
        ) : (
          <DevelopPane />
        )
      }
    />
  );
}
