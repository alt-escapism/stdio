import { memo } from "react";
import { proxy, snapshot, useSnapshot } from "valtio";
import { Frame } from "../frame/frame";
import { settings } from "../settings-state";

const frameState = proxy({
  nonce: 0,
});

export function reloadDevelopFrame() {
  frameState.nonce++;
}

export const DevelopFrame = memo(() => {
  const _frameState = useSnapshot(frameState);

  return (
    <Frame
      id="main"
      variables={snapshot(settings.variables)}
      nonce={_frameState.nonce}
    />
  );
});
