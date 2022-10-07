import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Input } from "../generic-ui/input";
import { InputGroup } from "../generic-ui/input-group";
import { Section } from "../generic-ui/section";
import { batchConfig } from "./batch-config-state";

const dualInputStyles = css`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export function BatchConfig() {
  const _batchConfig = useSnapshot(batchConfig);

  return (
    <Section>
      <InputGroup>
        <label>
          Iterations
          <Input
            value={_batchConfig.iterations}
            onChange={(e) => {
              batchConfig.iterations = e.target.value;
            }}
          />
        </label>
        <label>
          Window size
          <div className={dualInputStyles}>
            <Input
              value={_batchConfig.windowSizeX}
              onChange={(e) => {
                batchConfig.windowSizeX = e.target.value;
              }}
            />
            x
            <Input
              value={_batchConfig.windowSizeY}
              onChange={(e) => {
                batchConfig.windowSizeY = e.target.value;
              }}
            />
          </div>
        </label>
      </InputGroup>
    </Section>
  );
}
