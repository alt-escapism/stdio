import { BiArrowBack } from "react-icons/bi";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { Spacer } from "../generic-ui/spacer";
import { settings } from "../settings-state";
import { VariablesSection } from "../variables-section/variables-section";
import { BatchConfig } from "./batch-config";

export function BatchPane() {
  return (
    <>
      <Header>
        <Spacer>
          <ButtonGroup>
            <Button
              onClick={() => {
                settings.pane = "develop";
              }}
            >
              <BiArrowBack />
            </Button>
          </ButtonGroup>
          Generate batch
        </Spacer>
        <ButtonGroup>
          <Button onClick={() => {}}>Start</Button>
        </ButtonGroup>
      </Header>
      <BatchConfig />
      <VariablesSection />
    </>
  );
}
