import { AppInterface } from "../inject/app-interface";
import { requireFrame } from "./frames-state";
import { settings } from "./settings-state";
import { updateThumbnails } from "./thumbnails-state";

const MAX_RECENTS = 20;

export const appInterface: AppInterface = {
  addVariable(frameId, variable) {
    const { name, value } = variable;

    if (!name) {
      return;
    }

    requireFrame(frameId).variables[name] = variable;

    if (frameId === "main" && variable.type === "Hash") {
      if (!settings.recents[name]) {
        settings.recents[name] = [];
      }
      if (!settings.recents[name].find((v) => v === value)) {
        settings.recents[name].unshift(variable.value);
        settings.recents[name] = settings.recents[name].slice(0, MAX_RECENTS);
      }
    }
  },

  renderingComplete(frameId, durationMs) {
    requireFrame(frameId).durationMs = durationMs;
    if (frameId === "main") {
      updateThumbnails();
    }
  },
};
