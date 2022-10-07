import { css } from "@emotion/css";
import { getInjectedPage } from "./get-injected-page";
import { usePage } from "./use-page";

const styles = css`
  border: none;
  height: 100%;
  width: 100%;
`;

export function Frame({
  url = "/index.html",
  variables = {},
  nonce,
  id,
}: {
  url?: string;
  variables?: Record<string, string>;
  // Increment nonce to force a reload
  nonce?: number;
  id?: string;
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
    />
  );
}
