import { useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSnapshot } from "valtio";
import { getFrame } from "../shared/frames";
import { GenericIconButton } from "./generic-icon-button";
import { settings } from "./settings-state";

export function LightDarkButton() {
  const _settings = useSnapshot(settings);

  useEffect(() => {
    getFrame("main")?.__stdioSetBackground?.(settings.background);
  }, [_settings.background]);

  return (
    <GenericIconButton
      onClick={() =>
        (settings.background =
          settings.background === "light" ? "dark" : "light")
      }
    >
      {_settings.background === "light" ? <MdLightMode /> : <MdDarkMode />}
    </GenericIconButton>
  );
}
