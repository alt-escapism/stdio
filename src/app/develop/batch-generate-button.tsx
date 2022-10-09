import { VscRunAll } from "react-icons/vsc";
import { useSnapshot } from "valtio";
import { Button, SplitButton } from "../generic-ui/button";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { isEmbedded } from "../is-embedded";
import { settings } from "../settings-state";
import { BatchSummaryRow } from "../batch/batch-summary-row";

export function BatchGenerateButton() {
  if (isEmbedded()) return null;

  return (
    <SplitButton
      button={
        <Button
          tip="Generate batch"
          onClick={() => {
            settings.pane = "batch";
          }}
        >
          <VscRunAll />
        </Button>
      }
      dropdown={<RecentBatchesDropdown />}
    />
  );
}

function RecentBatchesDropdown() {
  const _batches = useSnapshot(settings.batches);
  const items = Object.values(_batches).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  return (
    <DropdownMenu
      header="Previous batches"
      items={items}
      getItemKey={(item) => item.id}
      renderItem={(item) => <BatchSummaryRow batchId={item.id} />}
      onSelect={(item) => {
        settings.pane = ["batch", item.id];
      }}
    />
  );
}
