import { VscRunAll } from "react-icons/vsc";
import { useSnapshot } from "valtio";
import { Button, SplitButton } from "../generic-ui/button";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { isEmbedded } from "../is-embedded";
import { settings } from "../settings-state";
import { BatchSummaryRow } from "../batch/batch-summary-row";
import { pushScreen } from "../navigation";

export function BatchGenerateButton() {
  if (isEmbedded()) return null;

  return (
    <SplitButton
      button={
        <Button
          tip="Generate batch"
          onClick={() => {
            pushScreen(["develop", "configure-batch"]);
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
      selectedItem={null}
      onSelect={(item) => {
        pushScreen(["batch", item.id]);
      }}
    />
  );
}
