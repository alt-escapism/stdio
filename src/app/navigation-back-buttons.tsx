import { BiArrowBack } from "react-icons/bi";
import { ButtonGroup, Button } from "./generic-ui/button";
import { popScreen } from "./navigation";

export function NavigationBackButton() {
  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          popScreen();
        }}
      >
        <BiArrowBack />
      </Button>
    </ButtonGroup>
  );
}
