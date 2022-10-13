export function urlParam(name: string): null | string | string[] {
  const values = new URLSearchParams(window.location.search).getAll(name);
  return values.length === 0 ? null : values.length === 1 ? values[0] : values;
}
