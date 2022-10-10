import { Settings } from "./settings.type";

export const projectKey =
  new URLSearchParams(window.location.search).get("project") ?? "stdio";

const storageKey = projectKey + ".settings";

const DEFAULT_SETTINGS: Settings = {
  variables: {},
  recents: {},
  background: "dark",
  autoReload: true,
  batches: {},
};

export function getStoredSettings(): Settings {
  const stored = localStorage.getItem(storageKey);
  return stored
    ? Object.assign({}, DEFAULT_SETTINGS, JSON.parse(stored))
    : DEFAULT_SETTINGS;
}

export function setStoredSettings(settings: Settings) {
  localStorage.setItem(storageKey, JSON.stringify(settings));
}
