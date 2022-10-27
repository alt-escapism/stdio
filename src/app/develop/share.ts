import {
  VariableSnapshot,
  VariableSnapshots,
} from "../../inject/variable-def.type";

const TYPES: { [k in VariableSnapshot["type"]]: number } = {
  Hash: 0,
  Number: 1,
  Array: 2,
  SimpleArray: 3,
  Object: 4,
};

function getTypeFor(n: number) {
  const entry = Object.entries(TYPES).find(([_, _n]) => _n === n);
  if (entry == null) {
    throw new Error(`No type corresponding to value ${n}`);
  }
  return entry[0] as VariableSnapshot["type"];
}

export function encode(variables: VariableSnapshots): string {
  const json = JSON.stringify(
    flatten(
      Object.entries(variables).map(([_, v]) => [
        v.name,
        TYPES[v.type],
        v.value,
      ])
    )
  );
  return btoa(json);
}

export function decode(encoded: string): VariableSnapshots {
  const json = atob(encoded);
  return Object.fromEntries(
    (
      split(JSON.parse(json), 3) as [
        VariableSnapshot["name"],
        number,
        VariableSnapshot["value"]
      ][]
    ).map((v) => [
      v[0],
      {
        name: v[0],
        type: getTypeFor(v[1]),
        value: v[2],
      } as any,
    ])
  );
}

function flatten<T>(args: T[][]): T[] {
  let arr: T[] = [];

  args.forEach((arg) => {
    arr = arr.concat(arg);
  });

  return arr;
}

function split<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i % size === 0) {
      result.push([arr[i]]);
    } else {
      result[result.length - 1].push(arr[i]);
    }
  }

  return result;
}
