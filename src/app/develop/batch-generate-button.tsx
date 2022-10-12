import { VscRunAll } from "react-icons/vsc";
import { Button, SplitButton } from "../generic-ui/button";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { isEmbedded } from "../is-embedded";
import { BatchSummaryRow } from "../batch/batch-summary-row";
import { pushScreen } from "../navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { getDb } from "../db";

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
  const batches = useLiveQuery(() =>
    getDb().Batch.orderBy("createdAt").reverse().toArray()
  );

  return (
    <DropdownMenu
      header="Previous batches"
      items={batches ?? []}
      getItemKey={(item) => item.id}
      renderItem={(item) => <BatchSummaryRow batchId={item.id} />}
      selectedItem={undefined}
      onSelect={(item) => {
        pushScreen(["batch", item.id]);
      }}
    />
  );
}
