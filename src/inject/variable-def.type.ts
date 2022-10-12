export type Variables = Record<string, Variable>;

export type Variable =
  | HashVar
  | NumberVar
  | ArrayVar
  | SimpleArrayVar
  | ObjectVar;

export type SnapshotOf<T extends Variable> = Pick<T, "type" | "name" | "value">;

export type VariableSnapshot =
  | SnapshotOf<HashVar>
  | SnapshotOf<NumberVar>
  | SnapshotOf<ArrayVar>
  | SnapshotOf<SimpleArrayVar>
  | SnapshotOf<ObjectVar>;

export type VariableSnapshots = Record<string, VariableSnapshot>;

export type HashVar = {
  type: "Hash";
  name: string;
  value: string;
  writable: true;
  shadowed?: string;
};

export type NumberVar = {
  type: "Number";
  name: string;
  value: number;
  writable: true;
  min?: number;
  max?: number;
  mean?: number;
  sd?: number;
  shadowed?: number;
};

export type ArrayVar = {
  type: "Array";
  name: string;
  value: number; // index of selected option
  options: unknown[];
  writable: true;
  shadowed?: number;
};

export type Primitive = number | string | boolean;

export type SimpleValue = Primitive | Primitive[] | Record<string, Primitive>;

export type SimpleArrayVar = {
  type: "SimpleArray";
  name: string;
  value: SimpleValue;
  options: SimpleValue[];
  writable: true;
  shadowed?: SimpleValue;
};

export type ObjectVar = {
  type: "Object";
  name: string;
  value: string; // key of selected option
  options: Record<string, unknown>;
  writable: true;
  shadowed?: string;
};
