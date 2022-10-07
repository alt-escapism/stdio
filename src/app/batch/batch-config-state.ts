import { proxyWithComputed } from "valtio/utils";

export const batchConfig = proxyWithComputed(
  {
    iterations: "100",
    windowSizeX: "2000",
    windowSizeY: "2000",
  },
  {
    isValid: (snap) =>
      isNumber(snap.iterations, (x) => x > 0) &&
      isNumber(snap.windowSizeX, (x) => x > 0) &&
      isNumber(snap.windowSizeY, (x) => x > 0),
    parsed: (snap) => ({
      iterations: Number(snap.iterations),
      windowSize: [Number(snap.windowSizeX), Number(snap.windowSizeY)] as [
        number,
        number
      ],
    }),
  }
);

function isNumber(value: string, condition?: (x: number) => boolean): boolean {
  if (value.trim() === "") return false;
  const num = Number(value);
  return !isNaN(num) && (!condition || condition(num));
}
