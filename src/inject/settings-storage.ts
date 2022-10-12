import { Settings } from "./settings.type";

export const projectKey =
  new URLSearchParams(window.location.search).get("project") ?? "stdio";

const storageKey = projectKey;

// Delete old key
localStorage.removeItem(projectKey + ".settings");

const DEFAULT_SETTINGS: Settings = {
  version: 1,
  variables: {},
  recents: {},
  background: "dark",
  autoReload: true,
  batches: {},
};

export function getStoredSettings(): Settings {
  const stored = localStorage.getItem(storageKey);
  const parsed = Object.assign(
    {},
    DEFAULT_SETTINGS,
    JSON.parse(stored ?? "{}")
  );
  return parsed;
}

export function setStoredSettings(settings: Settings) {
  localStorage.setItem(storageKey, JSON.stringify(settings));
}
