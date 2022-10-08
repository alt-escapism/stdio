import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSnapshot } from "valtio";
import { Button } from "../generic-ui/button";
import { settings } from "../settings-state";

export function ToggleBackgroundButton() {
  const _settings = useSnapshot(settings);

  return (
    <Button
      tip="Toggle background"
      onClick={() =>
        (settings.background =
          settings.background === "light" ? "dark" : "light")
      }
    >
      {_settings.background === "light" ? <MdLightMode /> : <MdDarkMode />}
    </Button>
  );
}
