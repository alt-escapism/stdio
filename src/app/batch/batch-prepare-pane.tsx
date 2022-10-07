import { BiArrowBack } from "react-icons/bi";
import { snapshot, useSnapshot } from "valtio";
import { Button, ButtonGroup } from "../generic-ui/button";
import { Header } from "../generic-ui/header";
import { Spacer } from "../generic-ui/spacer";
import { settings } from "../settings-state";
import { VariablesSection } from "../variables-section/variables-section";
import { variables } from "../variables-state";
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
              const startedAt = new Date().toISOString();
              const hashVariableNames = new Set(
                Object.values(variables)
                  .filter((variable) => variable.type === "Hash")
                  .map((variable) => variable.name)
              );
              settings.batches[startedAt] = {
                startedAt,
                total: parsed.iterations,
                done: 0,
                stopped: false,
                windowSize: parsed.windowSize,
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
