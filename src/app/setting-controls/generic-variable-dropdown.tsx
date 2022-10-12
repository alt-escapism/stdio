import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
import { Variable } from "../../inject/variable-def.type";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { autoReload } from "../reload";
import { OptionView } from "./option-view";
import { InputContainer } from "../generic-ui/input-container";
import { SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

const buttonStyles = css`
  opacity: 1;
  padding-right: 36px;
  width: 100%;

  :hover {
    background: none;
  }

  svg {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 8px;
    width: auto;
  }
`;

export function GenericVariableDropdown<T>({
  variable,
  items,
  selectedItem,
  renderItem,
  onSelect,
  header,
}: {
  variable: Variable;
  items: T[];
  selectedItem: T;
  renderItem: (item: T) => ReactNode;
  onSelect(item: T): void;
  header?: ReactNode;
}) {
  const lockStyles = useLockStyles(variable);

  return (
    <InputContainer>
      <DropdownMenu
        items={items}
        selectedItem={selectedItem}
        renderItem={(item) => <OptionView>{renderItem(item)}</OptionView>}
        onSelect={(item) => {
          onSelect(item);
          autoReload(variable);
        }}
        buttonClassName={cx(buttonStyles, lockStyles)}
        header={header}
      />
      <SettingLockButton variable={variable} />
    </InputContainer>
  );
}
