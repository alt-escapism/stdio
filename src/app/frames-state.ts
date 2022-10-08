import { proxy, useSnapshot } from "valtio";
import { VariableDefs } from "../inject/variable-def.type";

export type Frame = {
  id: string;
  variableDefs: VariableDefs;
  durationMs?: number;
};

export const frames: Record<string, Frame> = proxy({});

export function requireFrame(id: string): Frame {
  if (!frames[id]) {
    frames[id] = {
      id,
      variableDefs: {},
    };
  }
  return frames[id];
}

export function resetFrame(id: string) {
  const frame = requireFrame(id);
  frame.variableDefs = {};
  delete frame.durationMs;
}

export function useFrame(id: string) {
  requireFrame(id);
  return useSnapshot(frames)[id];
}

export function getHash(id: string) {
  return requireFrame(id).variableDefs["fxhash"]?.value as string | undefined;
}

export function getActiveVariableValues(id: string) {
  return Object.fromEntries(
    Object.values(requireFrame(id).variableDefs).map((variableDef) => [
      variableDef.name,
      String(variableDef.value),
    ])
  );
}
