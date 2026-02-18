"use client";
import { Flex, Text, useBreakpointValue } from "@aws-amplify/ui-react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
// Custom SingleValue component to show placeholder alongside selected value
const CustomSingleValue = (props: any) => {
  const { selectProps } = props;
  const placeholder = selectProps.placeholder;
  return (
    <Flex position={"absolute"} justifyContent={"center"} padding={"2px 8px"}>
      <Text whiteSpace={"nowrap"} letterSpacing={"0.1px"} lineHeight={"20px"}>
        {placeholder}
      </Text>
    </Flex>
  );
};
import { default as ReactSelect } from "react-select";

export interface Option {
  value: string;
  label: string;
}
export enum SelectTheme {
  Dark = "dark",
  Light = "light",
  LightNoBorder = "light-no-border",
  Transparent = "transparent",
}

interface SelectProps {
  theme?: SelectTheme;
  options: Option[];
  onSelect: (selectedOption: Option | null) => void;
  selectedOption?: Option | null;
  placeholder?: string;
  customControlStyles?: React.CSSProperties;
  value?: Option | null;
  minHeight?: string | object;
  className?: string;
  noOptionsMessage?: string;
  fixedPlaceholder?: boolean;
  CustomDropdownIndicator?: React.ComponentType<any>;

}

export function Select({
  theme = SelectTheme.Light,
  options,
  onSelect,
  selectedOption,
  placeholder,
  customControlStyles,
  minHeight,
  className,
  noOptionsMessage,
  fixedPlaceholder,
  CustomDropdownIndicator
}: SelectProps) {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const selectRef = useRef<HTMLDivElement>(null);

  const getBorder = () => {
    if (theme === SelectTheme.Dark) return "1px solid #ffffff";
    if (theme === SelectTheme.Light) return "1px solid #000000";
    if (theme === SelectTheme.LightNoBorder) return "none";
    if (theme === SelectTheme.Transparent) return "none";
  };

  const getColor = () => {
    if (theme === SelectTheme.Dark) return "white";
    return "black";
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontFamily: "var(--font-toyotaDisplay)",
      fontSize: "clamp(14px, 2vw, var(--amplify-font-sizes-small))",
      lineHeight: "var(--amplify-line-heights-xs)",
      backgroundColor:
        theme === SelectTheme.Transparent
          ? "transparent"
          : theme === SelectTheme.Dark
            ? "#161B1E"
            : "#FFFFFF",
      borderRadius: "7.5rem",
      border:
        theme === SelectTheme.Transparent ? "1px solid white" : getBorder(),
      boxShadow: "none",
      color: theme === SelectTheme.Transparent ? "white" : getColor(),
      padding: isMobile ? "0 16px" : "0 .625rem",
      gap: "3.8px",
      minHeight: minHeight || "40px",
      "&:hover": {
        borderColor: theme === SelectTheme.Transparent ? "white" : getBorder(),
      },
      ...customControlStyles, // Apply custom styles
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
      boxShadow: "none",
      border: "1px solid #000000",
      // maxHeight: "none", // Desactiva el límite de altura
      // overflowY: "visible", // Asegúrate de que se muestren todas las opciones
      borderRadius: "24px",
      zIndex: "999999999999999999",
    }),
    menuList: (provided: any) => ({
      ...provided,
      // maxHeight: "none",
      padding: "0px",
      borderRadius: "24px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontFamily: "var(--font-toyotaDisplay)",
      fontSize: "clamp(14px, 2vw, var(--amplify-font-sizes-small))",
      lineHeight: "var(--amplify-line-heights-xs)",
      backgroundColor: state.isFocused ? "#000000" : "#FFFFFF",
      color: state.isFocused ? "#FFFFFF" : "#000000",
      fontWeight: state.isSelected ? "bold" : "normal",
      cursor: "pointer",
      padding: "10px 30px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme === SelectTheme.Transparent ? "white" : getColor(),
      fontSize: "13px",
    }),
    dropdownIndicator: (provided: any) => ({
      color: theme === SelectTheme.Transparent ? "white" : getColor(),
      margin: "0",
      padding: "0",
      cursor: "pointer",
      height: "20px",
      paddingRight: fixedPlaceholder ? "8px" : undefined,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme === SelectTheme.Transparent ? "white" : getColor(),
    }),
  };

  return (
    <div ref={selectRef} className={className}>
      <ReactSelect
        className="custom-select"
        options={options}
        value={selectedOption || null}
        isOptionSelected={(option) => option.value === selectedOption?.value}
        onChange={(option) => onSelect(option as Option)}
        components={{
          IndicatorSeparator: null,
          ...(CustomDropdownIndicator && {DropdownIndicator:CustomDropdownIndicator}),
          ...(fixedPlaceholder ? { SingleValue: CustomSingleValue } : {}),
        }}
        backspaceRemovesValue={false}
        styles={customStyles}
        isSearchable={false}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage || "No Options"}
      />
    </div>
  );
}
