import { css } from "@emotion/css";
import { VariableSnapshots } from "../../inject/variable-def.type";
import { getInjectedPage } from "./get-injected-page";
import { usePage } from "./use-page";

const styles = css`
  border: none;
  display: block;
`;

export function Frame({
  id,
  url = "/index.html",
  variables = {},
  nonce,
  windowSize,
  scaledSize,
}: {
  id: string;
  url?: string;
  variables?: VariableSnapshots;
  // Increment nonce to force a reload
  nonce?: number;
  windowSize?: [number, number];
  scaledSize?: [number, number];
}) {
  const pageResult = usePage(url);

  if (pageResult.type === "loading") {
    return <div className={styles} />;
  }

  const injectedPage = getInjectedPage(pageResult.data, id, variables, nonce);

  return (
    <iframe
      id={id}
      srcDoc={injectedPage}
      title="Injected frame"
      className={styles}
      {...(windowSize
        ? { width: windowSize[0], height: windowSize[0] }
        : { width: "100%", height: "100%" })}
      {...(windowSize && scaledSize
        ? {
            style: {
              transform: `scale(${Math.min(
                scaledSize[0] / windowSize[0],
                scaledSize[1] / windowSize[1]
              )})`,
              transformOrigin: "top left",
            },
          }
        : {})}
    />
  );
}
