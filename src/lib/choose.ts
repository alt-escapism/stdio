import { rand } from "./random";

export type Weighted<T> = {
  weight: number;
  value: T;
};

export function weight<T>(weight: number, value: T): Weighted<T> {
  return { weight, value };
}

export type Choice<T> = T | Weighted<T>;

export function choose<T>(
  _name: string,
  choices: Choice<T>[] | Record<string, Choice<T>>
) {
  const choiceEntries = Object.entries(choices).map(
    ([key, choice]) => [key, toWeighted(choice)] as const
  );
  const totalWeight = choiceEntries.reduce(
    (total, [, choice]) => total + choice.weight,
    0
  );
  const rnd = rand() * totalWeight;
  let cumulativeWeight = 0;
  for (const [, choice] of choiceEntries) {
    cumulativeWeight += choice.weight;
    if (rnd < cumulativeWeight) {
      return choice.value;
    }
  }
  // Should never occur
}

function isWeighted<T>(choice: Choice<T>): choice is Weighted<T> {
  return choice != null && typeof choice === "object" && "weight" in choice;
}

// Normalizes to a weighted choice
function toWeighted<T>(choice: Choice<T>): Weighted<T> {
  return isWeighted(choice) ? choice : { weight: 1, value: choice };
}

// Normalizes to the unweighted choice value
export function toUnweighted<T>(choice: Choice<T>): T {
  return isWeighted(choice) ? choice.value : choice;
}
