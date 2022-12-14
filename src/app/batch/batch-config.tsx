import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Input } from "../generic-ui/input";
import { InputGroup } from "../generic-ui/input-group";
import { Section } from "../generic-ui/section";
import { InputContainer } from "../generic-ui/input-container";
import { batchConfig } from "./batch-config-state";

const dualInputStyles = css`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export function BatchConfig() {
  const _batchConfig = useSnapshot(batchConfig, { sync: true });

  return (
    <Section>
      <InputGroup>
        <label>Iterations</label>
        <InputContainer>
          <Input
            value={_batchConfig.iterations}
            onChange={(e) => {
              batchConfig.iterations = e.target.value;
            }}
          />
        </InputContainer>
        <label>Window size</label>
        <InputContainer>
          <div className={dualInputStyles}>
            <Input
              value={_batchConfig.windowWidth}
              onChange={(e) => {
                batchConfig.windowWidth = e.target.value;
              }}
            />
            x
            <Input
              value={_batchConfig.windowHeight}
              onChange={(e) => {
                batchConfig.windowHeight = e.target.value;
              }}
            />
          </div>
        </InputContainer>
      </InputGroup>
    </Section>
  );
}
