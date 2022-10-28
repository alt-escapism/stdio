import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
import { Variable } from "../../inject/variable-def.type";
import { autoReload } from "../reload";
import { OptionView } from "./option-view";
import { InputContainer } from "../generic-ui/input-container";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";
import { Combobox } from "../generic-ui/combobox";

const comboboxContainerStyles = css`
  opacity: 1;
`;

export function GenericVariableCombobox<T>({
  variable,
  items,
  itemToString,
  getItemForInput,
  selectedItem,
  renderItem,
  onSelect,
  header,
}: {
  variable: Variable;
  items: T[];
  itemToString: (item: T | undefined) => string;
  getItemForInput: (input: string) => T | undefined;
  selectedItem: T;
  renderItem: (item: T) => ReactNode;
  onSelect(item: T): void;
  header?: ReactNode;
}) {
  const lockStyles = useLockStyles(variable);

  return (
    <InputContainer>
      <Combobox
        items={items}
        itemToString={itemToString}
        selectedItem={selectedItem}
        renderItem={(item) => <OptionView>{renderItem(item)}</OptionView>}
        getItemForInput={getItemForInput}
        onSelect={(item) => {
          onSelect(item);
          autoReload(variable);
        }}
        containerClassName={cx(comboboxContainerStyles, lockStyles)}
        header={header}
      />
      <SettingLockButton variable={variable} />
    </InputContainer>
  );
}
