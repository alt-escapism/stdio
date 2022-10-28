import { useFloating, flip, offset, shift } from "@floating-ui/react-dom";
import { useCombobox } from "downshift";
import { css, cx } from "@emotion/css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { ReactNode, useState, useRef } from "react";
import { buttonStyles } from "./button";
import { Input } from "./input";
import { dropdownStyles } from "./dropdown-menu";

const inputContainerStyles = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 36px 0 12px;
  width: 100%;
`;

const dropdownButtonStyles = css`
  padding: 0 3px;

  :hover {
    background: none;
  }

  svg {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 8px;
    width: auto;
  }
`;

const overrideInputStyles = css`
  padding-left: 0;
  padding-right: 0;
`;

type NullValue = Symbol;

const NULL_VALUE: NullValue = Symbol("null");

function toNullValue<T>(value: T): T | NullValue {
  return value === null ? NULL_VALUE : value;
}

function fromNullValue<T>(value: T | NullValue): T {
  return (value === NULL_VALUE ? null : value) as T;
}

export function Combobox<T>({
  items,
  itemToString,
  getItemForInput,
  renderItem,
  onSelect,
  selectedItem,
  header,
  getItemKey,
  containerClassName,
}: {
  items: T[];
  itemToString: (item: T | undefined) => string;
  getItemForInput: (input: string) => T | undefined;
  renderItem(item: T): ReactNode;
  onSelect(item: T): void;
  selectedItem?: T;
  header?: ReactNode;
  getItemKey?: (item: T) => string;
  containerClassName?: string;
}) {
  const [inputValue, setInputValue] = useState<string>(
    itemToString(selectedItem)
  );
  const [isFiltering, setIsFiltering] = useState(false);
  let newItem: T | undefined = undefined;
  let _items: (T | NullValue)[] = isFiltering
    ? items.filter((value) =>
        itemToString(value)
          .toLowerCase()
          .includes(inputValue.trim().toLowerCase())
      )
    : items;
  const inputHasExactMatch = items.some(
    (item) =>
      itemToString(item).toLowerCase() === inputValue.trim().toLowerCase()
  );
  if (!inputHasExactMatch) {
    const item = getItemForInput(inputValue);
    if (item !== undefined) {
      newItem = item;
      _items.unshift(item);
    }
  }
  // Convert null to NULL_VALUE, since useSelect treats null as no selection
  _items = _items.map(toNullValue);

  let inputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    getInputProps,
  } = useCombobox<T | NullValue>({
    inputValue,
    items: _items,
    selectedItem: toNullValue(selectedItem),
    itemToString: (item) =>
      item === null ? "" : itemToString(fromNullValue(item)),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem != null) {
        onSelect(fromNullValue(selectedItem));
        setIsFiltering(false);
      }
    },
    onInputValueChange: ({ inputValue: newInputValue }) => {
      if (isFiltering === false) {
        setIsFiltering(true);
      }
      setInputValue(newInputValue ?? "");
      setHighlightedIndex(0);
    },
    onStateChange: ({ type }) => {
      // Reset input on Escape key down
      if (type === useCombobox.stateChangeTypes.InputKeyDownEscape) {
        setInputValue(itemToString(fromNullValue(selectedItem)));
        setIsFiltering(false);
        setTimeout(() => {
          inputRef.current?.select();
        });
      }

      // Select input value (if valid) on blur
      if (type === useCombobox.stateChangeTypes.InputBlur) {
        if (newItem !== undefined) {
          onSelect(fromNullValue(newItem));
        } else {
          setInputValue(itemToString(fromNullValue(selectedItem)));
        }
        setIsFiltering(false);
      }

      if (type === useCombobox.stateChangeTypes.InputFocus) {
        setTimeout(() => {
          inputRef.current?.select();
        });
      }
    },
  });

  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip(), offset(4), shift({ padding: 8 })],
  });

  return (
    <>
      <div ref={reference} style={{ position: "relative", width: "100%" }}>
        <div className={cx(inputContainerStyles, containerClassName)}>
          <Input
            {...getInputProps({ ref: inputRef })}
            className={overrideInputStyles}
            value={inputValue ?? itemToString(selectedItem)}
          />
          <button
            {...getToggleButtonProps()}
            className={cx(buttonStyles, dropdownButtonStyles)}
          >
            <MdOutlineArrowDropDown />
          </button>
        </div>
        <div {...getMenuProps()}>
          {isOpen && (
            <div
              className={dropdownStyles}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "calc(100% + 2px)",
              }}
            >
              {newItem !== undefined && (
                <ul>
                  <li
                    {...getItemProps({ item: newItem, index: 0 })}
                    style={{
                      background: highlightedIndex === 0 ? "#333" : undefined,
                      color: newItem === selectedItem ? "#fff" : "#aaa",
                      fontWeight: newItem === selectedItem ? 700 : 400,
                    }}
                  >
                    {renderItem(fromNullValue(newItem))}
                  </li>
                </ul>
              )}
              {header && _items.length > (newItem !== undefined ? 1 : 0) ? (
                <header>{header}</header>
              ) : null}
              <ul>
                {_items.map((item, index) => {
                  if (newItem !== undefined && index === 0) {
                    return null;
                  }
                  return (
                    <li
                      key={getItemKey ? getItemKey(fromNullValue(item)) : index}
                      {...getItemProps({ item, index })}
                      style={{
                        background:
                          index === highlightedIndex ? "#333" : undefined,
                        color: item === selectedItem ? "#fff" : "#aaa",
                        fontWeight: item === selectedItem ? 700 : 400,
                      }}
                    >
                      {renderItem(fromNullValue(item))}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
