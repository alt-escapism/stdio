import { css } from "@emotion/css";
import format from "date-fns/format";
import { useLiveQuery } from "dexie-react-hooks";
import { getDb } from "../db";

const styles = css`
  display: flex;
  gap: 6px;
  flex-direction: column;
  white-space: nowrap;
  width: 220px;

  > :first-child {
    color: white;
  }

  > :last-child {
    display: flex;
    font-size: 0.9em;
    gap: 12px;
  }
`;

export function BatchSummaryRow({ batchId }: { batchId: string }) {
  const batch = useLiveQuery(() => getDb().Batch.get(batchId));

  if (!batch) return <div className={styles} />;

  return (
    <div className={styles}>
      <div>
        {batch.rendered < batch.total ? (
          <>
            {batch.rendered}/{batch.total}
          </>
        ) : (
          <>Batch of {batch.total}</>
        )}
      </div>
      <div>
        <span>
          {batch.windowWidth}x{batch.windowHeight}
        </span>
        <span>{formatBatchDate(new Date(batch.createdAt))}</span>
      </div>
    </div>
  );
}

export function formatBatchDate(date: Date) {
  return format(date, "MMM dd, h:mmaaa");
}
