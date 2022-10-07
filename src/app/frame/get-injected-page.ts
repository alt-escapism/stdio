export function getInjectedPage(
  pageHTML: string,
  variables: Record<string, string> = {},
  nonce?: number
) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageHTML, "text/html");

  doc.documentElement.setAttribute(
    "data-stdio-variables",
    JSON.stringify(variables)
  );
  if (nonce != null) {
    doc.documentElement.setAttribute("data-stdio-nonce", String(nonce));
  }

  const targetScript = doc.getElementById("fxhash-snippet");
  const script = doc.createElement("script");
  script.src = "/stdio/inject.js";
  targetScript?.insertAdjacentElement("beforebegin", script);

  const html = doc.documentElement.outerHTML;
  return html;
}
