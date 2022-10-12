import { VscRunAll } from "react-icons/vsc";
import { Button, SplitButton } from "../generic-ui/button";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { BatchSummaryRow } from "../batch/batch-summary-row";
import { pushScreen } from "../navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { DbObject, getDb } from "../db";

export function BatchGenerateButton() {
  const batches = useLiveQuery(() =>
    getDb().Batch.orderBy("createdAt").reverse().toArray()
  );

  const button = (
    <Button
      tip="Generate batch"
      onClick={() => {
        pushScreen(["develop", "configure-batch"]);
      }}
    >
      <VscRunAll />
    </Button>
  );

  return batches && batches.length > 0 ? (
    <SplitButton
      button={button}
      dropdown={<RecentBatchesDropdown batches={batches} />}
    />
  ) : (
    button
  );
}

function RecentBatchesDropdown({ batches }: { batches: DbObject["Batch"][] }) {
  return (
    <DropdownMenu
      header="Previous batches"
      items={batches}
      getItemKey={(item) => (item ? item.id : "")}
      renderItem={(item) => item && <BatchSummaryRow batchId={item.id} />}
      selectedItem={null}
      onSelect={(item) => {
        if (item) pushScreen(["batch", item.id]);
      }}
    />
  );
}
