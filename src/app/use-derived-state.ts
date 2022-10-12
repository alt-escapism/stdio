import {
  Dispatch,
  useMemo,
  DependencyList,
  useRef,
  useState,
  useCallback,
} from "react";

export type SetDerivedStateAction<T> =
  | T
  | undefined
  | ((prevState: T) => T | undefined);

export function useDerivedState<T>(
  initialState: T | (() => T),
  dependencies?: DependencyList
): [T, Dispatch<SetDerivedStateAction<T>>] {
  const previousDerived = useRef<T | undefined>(undefined);
  const stateFn =
    typeof initialState === "function"
      ? (initialState as () => T)
      : () => initialState;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const derived = useMemo(stateFn, dependencies);
  const didDerivedChange = !Object.is(previousDerived.current, derived);
  previousDerived.current = derived;

  const [overrideState, setOverrideState] = useState<T | undefined>(undefined);
  const state =
    didDerivedChange || overrideState === undefined ? derived : overrideState;

  const setState = useCallback(
    (action: SetDerivedStateAction<T>) => {
      if (typeof action === "function") {
        setOverrideState((action as (prevState: T) => T | undefined)(state));
      } else {
        setOverrideState(action);
      }
    },
    [state]
  );

  return [state, setState];
}
