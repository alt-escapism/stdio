import { ReactNode } from "react";

const isDev = new URLSearchParams(document.location.search).get("dev") != null;

export function DevOnly({ children }: { children: ReactNode }) {
  return isDev ? <>{children}</> : null;
}
