(window as any).onStdioReady = () => {
  fetch("/index.html")
    .then((resp) => resp.text())
    .then((text) => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(text, "text/html");
      const target = parsed.getElementById("fxhash-snippet");

      const script = parsed.createElement("script");
      script.src = "/stdio/inject.js";
      target?.insertAdjacentElement("beforebegin", script);

      const html = parsed.documentElement.outerHTML;
      (document.getElementById("main") as HTMLIFrameElement).srcdoc = html;
    });
};

export {};
