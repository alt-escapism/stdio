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

type RawConfig = { [k in keyof Config]?: unknown };

export const DEFAULT_PROJECT_NAME = "stdio";

function parseConfig(): Config {
  const config: Config = {
    project: DEFAULT_PROJECT_NAME,
    playground: false,
  };

  const _config: RawConfig | undefined = (window as any).stdioConfig;
  if (_config) {
    if (typeof _config.playground === "boolean") {
      config.playground = _config.playground;
    }
    if (typeof _config.project === "string" && _config.project !== "") {
      config.project = _config.project;
    }
  }

  return config;
}

export const config = parseConfig();
