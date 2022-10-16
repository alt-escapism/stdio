import { useFloating, flip, offset, shift } from "@floating-ui/react-dom";
import { useSelect } from "downshift";
import { css, cx } from "@emotion/css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { ReactNode, useMemo } from "react";
import { buttonStyles } from "./button";

const overrideButtonStyles = css`
  justify-content: space-between;
`;

const dropdownStyles = css`
  background: #222;
  margin: 0;
  max-height: 340px;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 20px 6px rgba(0, 0, 0, 0.5);
  z-index: 1;

  > header {
    color: #999;
    font-size: 0.85em;
    letter-spacing: 2px;
    padding: 12px 12px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  > ul {
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      padding: 6px 12px;
      overflow: hidden;
      width: 100%;
      cursor: default;
    }
  }
`;

type NullValue = Symbol;

const NULL_VALUE: NullValue = Symbol("null");

function toNullValue<T>(value: T): T | NullValue {
  return value === null ? NULL_VALUE : value;
}

function fromNullValue<T>(value: T | NullValue): T {
  return (value === NULL_VALUE ? null : value) as T;
}

export function DropdownMenu<T>({
  items,
  itemToString,
  renderItem,
  onSelect,
  selectedItem,
  renderButton,
  header,
  getItemKey,
  buttonClassName,
}: {
  items: T[];
  renderItem(item: T): ReactNode;
  onSelect(item: T): void;
  selectedItem?: T;
  itemToString?: (item: T | undefined) => string;
  renderButton?: (item: T | undefined) => ReactNode;
  header?: ReactNode;
  getItemKey?: (item: T) => string;
  buttonClassName?: string;
}) {
  const _items = useMemo(
    // Convert null to NULL_VALUE, since useSelect treats null as no selection
    () => items.map(toNullValue),
    [items]
  );
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<T | NullValue>({
    items: _items,
    selectedItem: toNullValue(selectedItem),
    itemToString:
      itemToString &&
      ((item) => (item === null ? "" : itemToString(fromNullValue(item)))),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem != null) {
        onSelect(fromNullValue(selectedItem));
      }
    },
  });
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip(), offset(4), shift({ padding: 8 })],
  });
  const buttonContent = renderButton
    ? renderButton(selectedItem)
    : selectedItem !== undefined
    ? renderItem(selectedItem)
    : null;

  return (
    <>
      <div
        ref={reference}
        style={{
          position: "relative",
          ...(buttonContent != null ? { width: "100%" } : { maxWidth: "100%" }),
        }}
      >
        <button
          className={cx(buttonStyles, overrideButtonStyles, buttonClassName)}
          {...getToggleButtonProps()}
        >
          {buttonContent}
          <MdOutlineArrowDropDown />
        </button>
        <div {...getMenuProps()}>
          {isOpen && (
            <div
              className={dropdownStyles}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                ...(buttonContent != null
                  ? { width: "calc(100% + 2px)" }
                  : { minWidth: "calc(100% + 2px)" }),
              }}
            >
              {header ? <header>{header}</header> : null}
              <ul>
                {items.map((item, index) => {
                  return (
                    <li
                      key={getItemKey ? getItemKey(item) : index}
                      {...getItemProps({ item, index })}
                      style={{
                        background:
                          index === highlightedIndex ? "#333" : undefined,
                        color: item === selectedItem ? "#fff" : "#aaa",
                        fontWeight: item === selectedItem ? 700 : 400,
                      }}
                    >
                      {renderItem(item)}
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
