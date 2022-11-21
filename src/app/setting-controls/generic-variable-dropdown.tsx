import { css, cx } from "@emotion/css";
import { ReactNode } from "react";
import { Variable } from "../../inject/variable-def.type";
import { DropdownMenu } from "../generic-ui/dropdown-menu";
import { autoReload } from "../reload";
import { OptionView } from "./option-view";
import { InputContainer } from "../generic-ui/input-container";
import { LOCK_SIZE, SettingLockButton } from "./setting-lock-button";
import { useLockStyles } from "./use-lock-styles";

const buttonStyles = css`
  opacity: 1;
  padding-right: ${LOCK_SIZE}px;
  width: 100%;

  :hover {
    background: none;
  }

  svg {
    padding: 0 3px;
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
