import React from 'react';
import { Button as AmplifyButton } from '@aws-amplify/ui-react';

/* ---------------------------------- */
/* Base Button Props (AmpButton)     */
/* ---------------------------------- */

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?:
    | 'red'
    | 'deepred'
    | 'white'
    | 'transparent'
    | 'black'
    | 'underlined'
    | 'transparentBlack';
  size?: 'small' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isFullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  textColor?: 'white' | 'black';

  /* Style Props */
  padding?: string;
  margin?: string;
  display?: string;
  minWidth?: string;
  maxHeight?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  letterSpacing?: string;
  backgroundColor?: string;
  border?: string;
}

/* ---------------------------------- */
/* Wrapper Button Props              */
/* ---------------------------------- */

export interface DynamicButtonProps
  extends Omit<ButtonProps, 'children' | 'onClick'> {
  text: string;
  align?: 'left' | 'center' | 'right';
  onClickCode?: string;
  customCss?: string;
}

/* ---------------------------------- */
/* Wrapper Component                 */
/* ---------------------------------- */

/**
 *
 * @param root0
 * @param root0.text
 * @param root0.align
 * @param root0.onClickCode
 * @param root0.customCss
 * @param root0.className
 */
export default function Button({
  text,
  align = 'left',
  onClickCode,
  customCss,
  className,
  ...rest
}: DynamicButtonProps) {
  const uniqueClass = React.useMemo(
    () => `amplify-button-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const handleClick = React.useCallback(() => {
    if (!onClickCode) return;

    try {
      const fn = new Function(`return (${onClickCode})`)();
      if (typeof fn === 'function') fn();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Invalid onClick code', err);
    }
  }, [onClickCode]);

  return (
    <div
      style={{
        textAlign: align,
      }}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <AmpButton
        {...rest}
        onClick={handleClick}
        className={`${className ?? ''} ${uniqueClass}`}
      >
        {text}
      </AmpButton>
    </div>
  );
}

/* ---------------------------------- */
/* Base Amplify Button Component     */
/* ---------------------------------- */

/**
 *
 * @param root0
 * @param root0.type
 * @param root0.color
 * @param root0.size
 * @param root0.children
 * @param root0.onClick
 * @param root0.disabled
 * @param root0.className
 * @param root0.style
 * @param root0.isFullWidth
 * @param root0.isLoading
 * @param root0.loadingText
 * @param root0.textColor
 * @param root0.padding
 * @param root0.margin
 * @param root0.display
 * @param root0.minWidth
 * @param root0.maxHeight
 * @param root0.fontSize
 * @param root0.fontFamily
 * @param root0.fontWeight
 * @param root0.lineHeight
 * @param root0.maxWidth
 * @param root0.minHeight
 * @param root0.letterSpacing
 * @param root0.backgroundColor
 * @param root0.border
 */
function AmpButton({
  type = 'button',
  color = 'red',
  size = 'large',
  children,
  onClick,
  disabled,
  className,
  style,
  isFullWidth,
  isLoading,
  loadingText,
  textColor,
  padding,
  margin,
  display,
  minWidth,
  maxHeight,
  fontSize = '14px',
  fontFamily,
  fontWeight = 500,
  lineHeight = '1.25rem',
  maxWidth,
  minHeight,
  letterSpacing,
  backgroundColor,
  border,
}: ButtonProps) {
  const getVariation = () => {
    if (color === 'underlined') return 'link';
    if (['red', 'white', 'black'].includes(color)) return 'primary';
    return undefined;
  };

  const getColorTheme = () => {
    if (color === 'red') return 'red';
    if (color === 'deepred') return '#D42224';
    if (color === 'white') return 'white';
    if (color === 'black') return 'black';
    if (color === 'underlined') return 'transparent';
    if (color === 'transparent' || color === 'transparentBlack')
      return 'transparent';
    return 'white';
  };

  const getBorderColor = () => {
    if (color === 'transparent') return 'white';
    if (color === 'transparentBlack') return 'black';
    return 'transparent';
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    if (color === 'red') return 'white';
    if (color === 'white') return 'black';
    if (color === 'black') return 'white';
    if (color === 'underlined') return 'black';
    if (color === 'transparent') return 'black';
    return 'white';
  };

  return (
    <AmplifyButton
      variation={getVariation()}
      size={size}
      isDisabled={disabled}
      onClick={onClick}
      backgroundColor={backgroundColor ?? getColorTheme()}
      borderColor={getBorderColor()}
      color={getTextColor()}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      loadingText={loadingText}
      type={type}
      fontWeight={fontWeight}
      padding={padding ?? (size === 'small' ? '15px 20px' : undefined)}
      margin={margin}
      display={display}
      lineHeight={lineHeight}
      fontSize={fontSize}
      className={className}
      style={style}
      maxHeight={maxHeight}
      minWidth={minWidth}
      fontFamily={fontFamily}
      maxWidth={maxWidth}
      minHeight={minHeight}
      letterSpacing={letterSpacing}
      border={border}
    >
      {children}
    </AmplifyButton>
  );
}
