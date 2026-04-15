import React, { useEffect, useId, useRef, useState } from 'react';
import { Select, SelectTheme, Option } from './select';

interface DropdownProps {
  options: Option[];
  defaultValue?: Option['value'];
  theme?: SelectTheme;
  className?: string;
  customCss?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  fixedPlaceholder?: boolean;
  onChange?: (value: Option['value'] | null) => void;
}

/**
 *
 * @param root0
 * @param root0.options
 * @param root0.defaultValue
 * @param root0.theme
 * @param root0.className
 * @param root0.customCss
 * @param root0.placeholder
 * @param root0.noOptionsMessage
 * @param root0.fixedPlaceholder
 * @param root0.onChange
 */
export default function Dropdown({
  options,
  defaultValue,
  theme,
  className = '',
  customCss,
  placeholder = 'Select an option',
  noOptionsMessage = 'No options available',
  fixedPlaceholder = false,
  onChange,
}: DropdownProps) {
  const uniqueId = useId();
  const uniqueClass = `select-${uniqueId.replace(/:/g, '')}`;

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Sync default value when options/defaultValue change
  useEffect(() => {
    if (!defaultValue) {
      setSelectedOption(null);
      return;
    }

    const found = options.find((opt) => opt.value === defaultValue) ?? null;
    setSelectedOption(found);
  }, [defaultValue, options]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option | null) => {
    setSelectedOption(option);
    onChange?.(option?.value ?? null);

    // Defer the native event dispatch so React commits the local state update
    // before the EventHandlerWrapper's listener triggers a Redux re-render.
    setTimeout(() => {
      if (containerRef.current) {
        (containerRef.current as any).value = option?.value ?? '';
        containerRef.current.dispatchEvent(
          new Event('change', { bubbles: true })
        );
      }
    }, 0);
  };

  return (
    <div
      ref={containerRef}
      style={{
        margin: '10px 0',
      }}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <Select
        theme={theme}
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        placeholder={placeholder}
        className={`${className} ${uniqueClass}`.trim()}
        noOptionsMessage={noOptionsMessage}
        fixedPlaceholder={fixedPlaceholder}
      />
    </div>
  );
}
