import { useSnapshot } from "valtio";
import { useFloating, flip, offset } from "@floating-ui/react-dom";
import { settings } from "../settings-state";
import { useSelect } from "downshift";
import { css, cx } from "@emotion/css";
import { useLockStyles } from "./use-lock-styles";
import { SettingLockButton } from "./setting-lock-button";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ArrayVar, HashVar, ObjectVar } from "../../shared/variables.type";
import { autoReload } from "../reload";
import { OptionView } from "./option-view";
import { HashOptionView } from "./hash-option-view";
import { SettingControlContainer } from "./setting-control-container";

const buttonStyles = css`
  align-items: center;
  background: inherit;
  border: none;
  color: inherit;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  justify-content: space-between;
  padding: 6px 36px 6px 12px;
  width: 100%;
  text-align: left;

  svg {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 8px;
    flex-shrink: 0;
    width: 36px;
  }
`;

const dropdownStyles = css`
  width: calc(100% + 2px);
  z-index: 1;
  background: #222;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 340px;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 20px 6px rgba(0, 0, 0, 0.5);

  li {
    padding: 6px 12px;
    overflow: hidden;
    width: 100%;
    cursor: default;
  }
`;

export function SettingListbox({
  variable,
}: {
  variable: ArrayVar | ObjectVar | HashVar;
}) {
  const lockStyles = useLockStyles(variable);
  const _settings = useSnapshot(settings);
  const options =
    variable.type === "Hash"
      ? Object.fromEntries(
          (_settings.recents[variable.name] ?? []).map((hash) => [hash, hash])
        )
      : variable.options;
  const lockedKey = _settings.variables[variable.name];
  const activeKey = lockedKey ?? variable.value;
  const items = Object.keys(options);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: activeKey,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem != null) {
        settings.variables[variable.name] = selectedItem;
        autoReload(variable);
      }
    },
  });
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip(), offset(4)],
  });

  return (
    <SettingControlContainer ref={reference}>
      <button
        className={cx(buttonStyles, lockStyles)}
        {...getToggleButtonProps()}
      >
        {variable.type === "Hash" ? (
          <HashOptionView hash={variable.value} />
        ) : (
          <OptionView optionKey={activeKey} options={options} />
        )}
        <MdOutlineKeyboardArrowDown />
      </button>
      <SettingLockButton variable={variable} />
      <div {...getMenuProps()}>
        {isOpen && (
          <ul
            className={dropdownStyles}
            ref={floating}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
          >
            {items.map((item, index) => {
              return (
                <li
                  key={item}
                  {...getItemProps({ item, index })}
                  style={{
                    background: index === highlightedIndex ? "#333" : undefined,
                    color: item === activeKey ? "#fff" : "#aaa",
                    fontWeight: item === activeKey ? 700 : 400,
                  }}
                >
                  {variable.type === "Hash" ? (
                    <HashOptionView hash={item} />
                  ) : (
                    <OptionView optionKey={item} options={options} />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SettingControlContainer>
  );
}
