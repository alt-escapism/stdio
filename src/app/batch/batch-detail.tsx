import { useLiveQuery } from "dexie-react-hooks";
import { getDb } from "../db";
import { Pane } from "../generic-ui/pane";
import { Section } from "../generic-ui/section";
import { VariableTreeView } from "../variables-section/variable-tree-view";

export function BatchDetail({ batchId }: { batchId: string }) {
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  if (!batch) return null;

  return (
    <Pane
      main={
        <Section title="Batch variables">
          <VariableTreeView variables={batch.variables} />
        </Section>
      }
    />
  );
}
