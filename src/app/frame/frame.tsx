import { css } from "@emotion/css";
import { getInjectedPage } from "./get-injected-page";
import { usePage } from "./use-page";

const styles = css`
  border: none;
`;

export function Frame({
  url = "/index.html",
  variables = {},
  nonce,
  id,
  windowSize,
  scaledSize,
}: {
  url?: string;
  variables?: Record<string, string>;
  // Increment nonce to force a reload
  nonce?: number;
  id?: string;
  windowSize?: [number, number];
  scaledSize?: [number, number];
}) {
  const pageResult = usePage(url);

  if (pageResult.type === "loading") {
    return <div className={styles} />;
  }

  const injectedPage = getInjectedPage(pageResult.data, variables, nonce);

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
