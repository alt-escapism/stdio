import { nanoid } from "nanoid";
import { snapshot, useSnapshot } from "valtio";
import { requireFrame } from "../frames-state";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Pane } from "../generic-ui/pane";
import { Spacer } from "../generic-ui/spacer";
import { pushScreen } from "../navigation";
import { NavigationBackButton } from "../navigation-back-buttons";
import { settings } from "../settings-state";
import { VariablesSection } from "../variables-section/variables-section";
import { BatchConfig } from "./batch-config";
import { batchConfig } from "./batch-config-state";

export function BatchConfigurePane() {
  const _batchConfig = useSnapshot(batchConfig);

  return (
    <Pane
      header={
        <>
          <Spacer>
            <NavigationBackButton />
            Generate batch
          </Spacer>
          <ButtonGroup>
            <Button
              onClick={() => {
                const parsed = batchConfig.parsed;
                const createdAt = new Date().toISOString();
                const hashVariableNames = new Set(
                  Object.values(requireFrame("main").variableDefs)
                    .filter((variableDef) => variableDef.type === "Hash")
                    .map((variableDef) => variableDef.name)
                );
                const id = nanoid();
                settings.batches[id] = {
                  id,
                  createdAt,
                  total: parsed.iterations,
                  done: 0,
                  windowWidth: parsed.windowWidth,
                  windowHeight: parsed.windowHeight,
                  variables:
                    // Exclude hash variables
                    Object.fromEntries(
                      Object.entries(snapshot(settings.variables)).filter(
                        ([name]) => !hashVariableNames.has(name)
                      )
                    ),
                };
                pushScreen(["batch", id]);
              }}
              disabled={!_batchConfig.isValid}
            >
              Start
            </Button>
          </ButtonGroup>
        </>
      }
      main={
        <>
          <BatchConfig />
          <VariablesSection />
        </>
      }
    />
  );
}
