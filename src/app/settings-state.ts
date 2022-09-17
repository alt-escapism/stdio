import { proxy, subscribe } from "valtio";
import {
  getStoredSettings,
  setStoredSettings,
} from "../shared/settings-storage";
import { Settings } from "../shared/settings.type";

export const settings = proxy<Settings>(getStoredSettings());

subscribe(settings, () => {
  setStoredSettings(settings);
});
