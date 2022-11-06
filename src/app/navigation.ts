import { ReactElement } from "react";
import { proxy, ref } from "valtio";
import { last } from "./last";

export type Screen =
  | ["develop"]
  | ["develop/configure-batch"]
  | ["batch", string]
  | ["image", { imageId: string; onPrev?: () => void; onNext?: () => void }]
  | ["dialog", ReactElement];

const ROOT_SCREEN: Screen = ["develop"];

export type StackEntry = {
  screen: Screen;
  onPop?: () => void;
};

export const navigation = proxy({
  stack: [{ screen: ROOT_SCREEN }] as StackEntry[],
});

export function pushScreen(
  screen: Screen,
  options: { onPop?: () => void } = {}
) {
  // Replace screen if the top of the stack is a screen of the same type
  if (last(navigation.stack)!.screen[0] === screen[0]) {
    if (!popScreen()) {
      return;
    }
  }
  navigation.stack.push({ screen: ref(screen), onPop: options.onPop });
}

export function popScreen(to?: Screen): boolean {
  const index = to
    ? navigation.stack.findIndex(
        (entry) =>
          entry.screen.length === to.length &&
          (entry.screen as unknown[]).every((part, index) => part === to[index])
      )
    : navigation.stack.length - 1;

  if (index <= 0) {
    return false;
  }

  const popped = navigation.stack.splice(
    index,
    navigation.stack.length - index
  );
  if (popped.length === 0) {
    return false;
  }

  popped.forEach((entry) => {
    entry.onPop?.();
  });

  return true;
}

export function flattenStack(stack: StackEntry[]): StackEntry[] {
  const flattened: StackEntry[] = [];
  const screenNames = new Set<string>();
  for (let i = stack.length - 1; i >= 0; i--) {
    const screen = stack[i].screen;
    const baseName = screen[0].split("/")[0];
    if (!screenNames.has(baseName)) {
      screenNames.add(baseName);
      flattened.unshift(stack[i]);
    }
  }
  return flattened;
}
