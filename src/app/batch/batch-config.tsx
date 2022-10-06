import { css } from "@emotion/css";
import { Input } from "../generic-ui/input";
import { InputGroup } from "../generic-ui/input-group";
import { Section } from "../generic-ui/section";

export type Batch = {
  timestamp: string;
};

const dualInputStyles = css`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export function BatchConfig() {
  return (
    <Section>
      <InputGroup>
        <label>
          Iterations <Input value="100" />
        </label>
        <label>
          Window size
          <div className={dualInputStyles}>
            <Input value="2000" />x<Input value="2000" />
          </div>
        </label>
      </InputGroup>
    </Section>
  );
}
