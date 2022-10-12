import { proxy, useSnapshot } from "valtio";
import { Variables } from "../inject/variable-def.type";
import { getValueOfType, toVariableSnapshot } from "./variables";

export type Frame = {
  id: string;
  variables: Variables;
  durationMs?: number;
};

export const frames: Record<string, Frame> = proxy({});

export function requireFrame(id: string): Frame {
  if (!frames[id]) {
    frames[id] = {
      id,
      variables: {},
    };
  }
  return frames[id];
}

export function resetFrame(id: string) {
  const frame = requireFrame(id);
  frame.variables = {};
  delete frame.durationMs;
}

export function useFrame(id: string) {
  requireFrame(id);
  return useSnapshot(frames)[id];
}

export function getHash(id: string) {
  return getValueOfType(requireFrame(id).variables["fxhash"], "Hash");
}

export function getVariableSnapshots(id: string) {
  return Object.fromEntries(
    Object.values(requireFrame(id).variables).map((variable) => [
      variable.name,
      toVariableSnapshot(variable),
    ])
  );
}
