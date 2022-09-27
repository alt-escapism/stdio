import { getParentFrame } from "./frames";
import { Settings } from "./settings.type";

const parent = getParentFrame();

export const projectKey =
  (parent
    ? new URLSearchParams(parent.location.search).get("project")
    : null) ?? "stdio";

const storageKey = projectKey + ".settings";

const DEFAULT_SETTINGS: Settings = {
  variables: {},
  recents: {},
  background: "light",
  autoReload: true,
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
