import { VscRunAll } from "react-icons/vsc";
import { Button } from "../generic-ui/button";
import { isEmbedded } from "../is-embedded";
import { settings } from "../settings-state";

export function BatchGenerateButton() {
  if (isEmbedded()) return null;

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
