import { css } from "@emotion/css";
import format from "date-fns/format";
import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { settings } from "../settings-state";

const styles = css`
  display: flex;
  gap: 6px;
  flex-direction: column;
  white-space: nowrap;

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
  const batch = useSnapshot(settings).batches[batchId];
  const date = useMemo(() => new Date(batch.createdAt), [batch.createdAt]);

  if (!batch) return null;

  return (
    <div className={styles}>
      <div>{formatBatchDate(date)}</div>
      <div>
        <span>
          {batch.done < batch.total ? (
            <>
              {batch.done}/{batch.total} iterations
            </>
          ) : (
            <>{batch.total} iterations</>
          )}
        </span>
        <span>
          {batch.windowWidth}x{batch.windowHeight}
        </span>
      </div>
    </div>
  );
}

export function formatBatchDate(date: Date) {
  return format(date, "MMM dd, h:mmaaa");
}
