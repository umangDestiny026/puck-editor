import React, { useEffect, useId, useRef, useState } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  customCss?: string;
  name: string;
  errorMessage?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/**
 *
 * @param root0
 * @param root0.label
 * @param root0.options
 * @param root0.placeholder
 * @param root0.required
 * @param root0.className
 * @param root0.customCss
 * @param root0.name
 * @param root0.errorMessage
 * @param root0.defaultValue
 * @param root0.onChange
 */
export default function SearchableDropdown({
  label,
  options,
  placeholder = 'Select...',
  required = false,
  className = '',
  customCss,
  name,
  errorMessage = 'This field is required',
  defaultValue = '',
  onChange,
}: SearchableDropdownProps) {
  const uniqueId = useId();
  const uniqueClass = `searchdd-${uniqueId.replace(/:/g, '')}`;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string>(defaultValue);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  // Sync default value
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setTouched(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: DropdownOption) => {
    setSelected(option.label);
    setQuery('');
    setOpen(false);
    onChange?.(option.value);

    // Set value on the wrapper so event.target.value works, then dispatch
    if (wrapperRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (wrapperRef.current as any).value = option.value;
      wrapperRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const showError = touched && required && !selected;

  return (
    <div
      ref={wrapperRef}
      style={{
        margin: '10px 0',
        position: 'relative',
        width: '260px',
      }}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      {label && (
        <label
          htmlFor={uniqueId}
          style={{
            fontWeight: 500,
            display: 'block',
            marginBottom: '6px',
          }}
        >
          {label}
        </label>
      )}

      <input
        id={uniqueId}
        type="text"
        name={name}
        placeholder={placeholder}
        value={query || selected}
        className={`${className} ${uniqueClass}`.trim()}
        style={{
          width: '100%',
          padding: '8px 10px',
          border: '1px solid #ddd',
          borderRadius: '6px',
        }}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />

      {open && filteredOptions.length > 0 && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '6px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: '160px',
            overflowY: 'auto',
          }}
        >
          {filteredOptions.map((opt) => (
            <div
              key={opt.value}
              role="option"
              style={{
                padding: '8px 10px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
              }}
              onMouseDown={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {showError && (
        <span
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}
