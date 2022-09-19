export type Variables = Record<string, Variable>;

export type Variable = HashVar | NumberVar | ArrayVar | ObjectVar;

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
  min: number;
  max: number;
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
