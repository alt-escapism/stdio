import { proxyWithComputed } from "valtio/utils";

export type Screen =
  | ["develop"]
  | ["develop", "configure-batch"]
  | ["batch", string]
  | ["image", string];

export const navigation = proxyWithComputed(
  {
    history: [["develop"]] as Screen[],
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
  navigation.history.push(screen);
}

export function popScreen(): Screen | undefined {
  if (navigation.history.length > 1) {
    return navigation.history.pop() as Screen;
  }
}
