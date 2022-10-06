import { VscRunAll } from "react-icons/vsc";
import { Button } from "../generic-ui/button";
import { settings } from "../settings-state";

export function BatchGenerateButton() {
  return (
    <Button
      tip="Generate batch"
      onClick={() => {
        settings.pane = "batch";
      }}
    >
      <VscRunAll />
    </Button>
  );
}
