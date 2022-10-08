import { proxy, useSnapshot } from "valtio";
import { VariableDefs } from "../inject/variable-def.type";

export type Frame = {
  id: string;
  variableDefs: VariableDefs;
  durationMs?: number;
};

export const frames: Record<string, Frame> = proxy({});

export function getEmptyFrame(id: string): Frame {
  return {
    id,
    variableDefs: {},
  };
}

export function requireFrame(id: string): Frame {
  if (!frames[id]) {
    frames[id] = getEmptyFrame(id);
  }
  return frames[id];
}

export function useFrame(id: string) {
  return useSnapshot(frames)[id] ?? getEmptyFrame(id);
}

export function getHash(id: string) {
  return requireFrame(id).variableDefs["fxhash"]?.value as string | undefined;
}
