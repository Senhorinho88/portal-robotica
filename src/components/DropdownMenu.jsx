import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export default function DropdownMenu({ options, value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const listId = useId();
  const selected =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    optionRefs.current[
      options.findIndex((option) => option.value === value)
    ]?.focus();
    function handleOutside(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open, options, value]);

  function choose(option) {
    onChange(option.value);
    option.onSelect?.();
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKey(event, index) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
    const next = {
      ArrowDown: (index + 1) % options.length,
      ArrowUp: (index - 1 + options.length) % options.length,
      Home: 0,
      End: options.length - 1,
    }[event.key];
    if (next !== undefined) {
      event.preventDefault();
      optionRefs.current[next]?.focus();
    }
  }

  return (
    <div
      className="dropdown"
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        aria-label={`${label}: ${selected.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp"].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span>{selected.label}</span>
        <Icon name="chevron" size={16} />
      </button>
      {open && (
        <div
          className="dropdown-options"
          id={listId}
          role="listbox"
          aria-label={label}
        >
          {options.map((option, i) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[i] = element;
              }}
              role="option"
              aria-selected={value === option.value}
              onClick={() => choose(option)}
              onKeyDown={(event) => handleKey(event, i)}
            >
              {option.label}
              {value === option.value && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
