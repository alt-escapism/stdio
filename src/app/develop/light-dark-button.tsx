import { useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSnapshot } from "valtio";
import { Button } from "../generic-ui/button";
import { settings } from "../settings-state";

export function LightDarkButton() {
  const _settings = useSnapshot(settings);

  useEffect(() => {
    document.body.style.background =
      settings.background === "dark" ? "#000" : "#fff";
  }, [_settings.background]);

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
