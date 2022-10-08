import { proxyWithComputed } from "valtio/utils";

export const batchConfig = proxyWithComputed(
  {
    iterations: "100",
    windowWidth: "2000",
    windowHeight: "2000",
  },
  {
    isValid: (snap) =>
      isNumber(snap.iterations, (x) => x > 0) &&
      isNumber(snap.windowWidth, (x) => x > 0) &&
      isNumber(snap.windowHeight, (x) => x > 0),
    parsed: (snap) => ({
      iterations: Number(snap.iterations),
      windowWidth: Number(snap.windowWidth),
      windowHeight: Number(snap.windowHeight),
    }),
  }
);

function isNumber(value: string, condition?: (x: number) => boolean): boolean {
  if (value.trim() === "") return false;
  const num = Number(value);
  return !isNaN(num) && (!condition || condition(num));
}
