export function randomFn() {
  return ((window as any).fxrand ?? Math.random)();
}
