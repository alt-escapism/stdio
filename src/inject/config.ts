/* eslint-disable no-cond-assign */

/**
 * Stdio config.
 *
 * Injected via StdioWebpackPlugin's options, or by manually including
 * <script>stdioConfig={CONFIG}</script> in the index.html.
 */

type Config = {
  project: string;
  playground: boolean;
};

export const DEFAULT_PROJECT_NAME = "stdio";

function parseConfig(): Config {
  const config: Config = {
    project: DEFAULT_PROJECT_NAME,
    playground: false,
  };

  const configEl = document.querySelector("stdio-config");
  if (configEl) {
    let a: string | null;
    if ((a = configEl.getAttribute("playground"))) {
      if (a === "true") {
        config.playground = true;
      }
    }
    if ((a = configEl.getAttribute("project"))) {
      config.project = a;
    }
  }

  return config;
}

export const config = parseConfig();
