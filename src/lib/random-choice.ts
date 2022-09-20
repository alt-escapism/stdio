import { randomFn } from "./random-fn";

export type Weighted<T> = {
  weight: number;
  value: T;
};

export function weight<T>(weight: number, value: T): Weighted<T> {
  return { weight, value };
}

export type Choice<T> = Weighted<T> | T;

export function randomChoice<T>(
  _name: string,
  choices: Choice<T>[] | { [k: string]: Choice<T> }
): T {
  const choiceEntries = Object.entries(choices).map(
    ([key, choice]) => [key, toWeighted(choice)] as const
  );
  const totalWeight = choiceEntries.reduce(
    (total, [, choice]) => total + choice.weight,
    0
  );
  const rnd = randomFn() * totalWeight;
  let cumulativeWeight = 0;
  for (const [, choice] of choiceEntries) {
    cumulativeWeight += choice.weight;
    if (rnd < cumulativeWeight) {
      return choice.value;
    }
  }
  // Should never occur
  return choiceEntries[0][1].value;
}

function isWeighted<T>(choice: Choice<T>): choice is Weighted<T> {
  return (
    choice != null &&
    typeof choice === "object" &&
    "weight" in choice &&
    "value" in choice
  );
}

// Normalizes to a weighted choice
function toWeighted<T>(choice: Choice<T>): Weighted<T> {
  return isWeighted(choice) ? choice : { weight: 1, value: choice };
}

// Normalizes to the unweighted choice value
export function toUnweighted<T>(choice: Choice<T>): T {
  return isWeighted(choice) ? choice.value : choice;
}
