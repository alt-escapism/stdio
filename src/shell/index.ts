(window as any).onStdioReady = () => {
  fetch("/index.html")
    .then((resp) => resp.text())
    .then((text) => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(text, "text/html");
      const target = parsed.getElementById("fxhash-snippet");

      const beforeScript = parsed.createElement("script");
      beforeScript.src = "/stdio/inject.js";
      target?.insertAdjacentElement("beforebegin", beforeScript);

      const afterScript = parsed.createElement("script");
      afterScript.src = "/stdio/inject-after.js";
      target?.insertAdjacentElement("afterend", afterScript);

      const html = parsed.documentElement.outerHTML;
      (document.getElementById("main") as HTMLIFrameElement).srcdoc = html;
    });
};

export {};
