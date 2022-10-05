import { VscRunAll } from "react-icons/vsc";
import { appState } from "../app-state";
import { Button } from "../generic-ui/button";

export function BatchGenerateButton() {
  return (
    <Button
      tip="Generate batch"
      onClick={() => {
        appState.pane = "batch";
      }}
    >
      <VscRunAll />
    </Button>
  );
}
