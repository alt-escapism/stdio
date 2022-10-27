import { config } from "./config";
import { Settings } from "./settings.type";

const storageKey = config.project;

// Delete old key
localStorage.removeItem(storageKey + ".settings");

export const BATCH_THUMBNAIL_SIZES = [180, 300, 440] as [
  number,
  number,
  number
];

const DEFAULT_SETTINGS: Settings = {
  version: 1,
  variables: {},
  recents: {},
  background: "dark",
  autoReload: true,
  batchThumbnailSize: BATCH_THUMBNAIL_SIZES[1],
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
