export function rand() {
  return ((window as any).fxrand ?? Math.random)();
}

export function random(
  _name: string,
  min: number = 0,
  max: number = 1,
  transform = (x: number) => x
): number {
  return transform(rand() * (max - min) + min);
}
