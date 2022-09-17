import { css } from "@emotion/css";
import { useSnapshot } from "valtio";
import { Section } from "./section";
import { SettingInput } from "./setting-controls/setting-input";
import { SettingListbox } from "./setting-controls/setting-listbox";
import { variables } from "./variables-state";

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const variableStyles = css`
  display: grid;
  grid-template-columns: 40% minmax(0, 1fr);
  gap: 12px;
  align-items: center;

  label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export function VariablesSection() {
  const _variables = useSnapshot(variables);

  return (
    <Section title="Variables">
      <div className={containerStyles}>
        {Object.values(_variables)
          .filter((variable) => variable.type !== "Hash")
          .map((variable) => {
            const { name, type } = variable;
            return (
              <div key={name} className={variableStyles}>
                <label>{name}</label>
                {type === "Array" || type === "Object" ? (
                  <SettingListbox variable={variable} />
                ) : (
                  <SettingInput variable={variable} />
                )}
              </div>
            );
          })}
      </div>
    </Section>
  );
}
