import { ComponentProps, ReactNode } from "react";
import { ref } from "valtio";
import { proxyWithComputed } from "valtio/utils";
import { Button } from "./generic-ui/button";
import { last } from "./last";

export type Screen =
  | ["develop"]
  | ["develop", "configure-batch"]
  | ["batch", string]
  | ["image", string]
  | ["dialog", { body: ReactNode; actions: ComponentProps<typeof Button>[] }];

const ROOT_SCREEN: Screen = ["develop"];

export const navigation = proxyWithComputed(
  {
    history: [ROOT_SCREEN] as Screen[],
  },
  {
    stack: ({ history }) => {
      const screenNames = new Set<string>();
      const stack: Screen[] = [];
      for (let i = history.length - 1; i >= 0; i--) {
        const screenName = history[i][0];
        if (!screenNames.has(screenName)) {
          stack.unshift(history[i] as Screen);
          screenNames.add(screenName);
        }
      }
      return stack;
    },
  }
);

export function pushScreen(screen: Screen) {
  navigation.history.push(ref(screen));
}

export function popScreen(screen: Screen = last(navigation.history)!) {
  const index = navigation.history.findIndex(
    (_screen) =>
      _screen.length === screen.length &&
      (_screen as unknown[]).every((part, index) => part === screen[index])
  );
  navigation.history.splice(index, navigation.history.length - index);
  if (navigation.history.length === 0) {
    navigation.history.push(ROOT_SCREEN);
  }
}
