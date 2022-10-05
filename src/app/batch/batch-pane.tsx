import { BiArrowBack } from "react-icons/bi";
import { appState } from "../app-state";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { Spacer } from "../generic-ui/spacer";

export function BatchPane() {
  return (
    <>
      <Header>
        <Spacer>
          <ButtonGroup>
            <Button
              onClick={() => {
                appState.pane = "develop";
              }}
            >
              <BiArrowBack />
            </Button>
          </ButtonGroup>
          Generate batch
        </Spacer>
      </Header>
    </>
  );
}
