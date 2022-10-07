import { BiArrowBack } from "react-icons/bi";
import { useSnapshot } from "valtio";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { Section } from "../generic-ui/section";
import { Spacer } from "../generic-ui/spacer";
import { settings } from "../settings-state";

export function BatchRunningPane({ id }: { id: string }) {
  const _settings = useSnapshot(settings);
  const batch = _settings.batches[id];

  // Shouldn't happen
  if (!batch) return null;

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
          <Button
            onClick={() => {
              settings.batches[id].stopped = true;
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Header>
      <Section>
        Generating {batch.done + 1} of {batch.total}...
      </Section>
    </>
  );
}
