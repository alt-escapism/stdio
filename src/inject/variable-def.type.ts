export type VariableDefs = Record<string, VariableDef>;

export type VariableDef = HashVar | NumberVar | ArrayVar | ObjectVar;

export type HashVar = {
  type: "Hash";
  name: string;
  value: string;
  shadowed?: string;
};

export type NumberVar = {
  type: "Number";
  name: string;
  value: number;
  min?: number;
  max?: number;
  mean?: number;
  sd?: number;
  shadowed?: number;
};

export type ArrayVar = {
  type: "Array";
  name: string;
  options: readonly unknown[];
  value: string; // index of selected option
  shadowed?: string;
};

export type ObjectVar = {
  type: "Object";
  name: string;
  options: Record<string, unknown>;
  value: string; // key of selected option
  shadowed?: string;
};
