import { nanoid } from "nanoid";
import { BiArrowBack } from "react-icons/bi";
import { snapshot, useSnapshot } from "valtio";
import { requireFrame } from "../frames-state";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { Spacer } from "../generic-ui/spacer";
import { settings } from "../settings-state";
import { VariablesSection } from "../variables-section/variables-section";
import { BatchConfig } from "./batch-config";
import { batchConfig } from "./batch-config-state";

export function BatchPreparePane() {
  const _batchConfig = useSnapshot(batchConfig);

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
                stopped: false,
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
            }}
            disabled={!_batchConfig.isValid}
          >
            Start
          </Button>
        </ButtonGroup>
      </Header>
      <BatchConfig />
      <VariablesSection />
    </>
  );
}
