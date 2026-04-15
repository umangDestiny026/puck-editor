import React, { useEffect, useMemo, useState } from 'react';
import { DropZone } from '@puckeditor/core';
import styles from './modal.module.css';

type OpenType = 'button' | 'dropdown';
type ModalSize = 'full' | 'large' | 'medium' | 'half' | 'small' | 'fixed';

interface ModalBlockProps {
  title?: string;
  description?: string;
  showOpenButton?: boolean;
  openButtonLabel?: string;
  openType?: OpenType;
  modalSize?: ModalSize;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  showModalButton?: boolean;
  modalBackground?: string;
  modalTextColor?: string;
  overlayColor?: string;
  customButtonCss?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
  openButtonIcon?: string;
  borderRadius?: string;
  dropdownWidth?: string | number;
  className?: string;
}

const MODAL_WIDTHS: Record<ModalSize, string> = {
  full: '100vw',
  large: '80%',
  medium: '60%',
  half: '50%',
  small: '400px',
  fixed: '600px',
};

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.description
 * @param root0.showOpenButton
 * @param root0.openButtonLabel
 * @param root0.openType
 * @param root0.modalSize
 * @param root0.showCloseButton
 * @param root0.closeOnOverlay
 * @param root0.showModalButton
 * @param root0.modalBackground
 * @param root0.modalTextColor
 * @param root0.overlayColor
 * @param root0.customButtonCss
 * @param root0.buttonBackground
 * @param root0.buttonTextColor
 * @param root0.openButtonIcon
 * @param root0.borderRadius
 * @param root0.dropdownWidth
 * @param root0.className
 */
export default function ModalBlock({
  title,
  description,
  showOpenButton = true,
  openButtonLabel = 'Open Modal',
  openType = 'button',
  modalSize = 'medium',
  showCloseButton = true,
  closeOnOverlay = true,
  showModalButton = false,
  modalBackground = '#ffffff',
  modalTextColor = '#000000',
  overlayColor = 'rgba(0,0,0,0.5)',
  customButtonCss,
  buttonBackground = '#2563eb',
  buttonTextColor = '#ffffff',
  openButtonIcon,
  borderRadius = '12px',
  dropdownWidth = '200px',
  className,
}: ModalBlockProps) {
  const [open, setOpen] = useState<boolean>(showModalButton);

  // Sync controlled open
  useEffect(() => {
    setOpen(showModalButton);
  }, [showModalButton]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC key support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const modalWidth = useMemo(() => MODAL_WIDTHS[modalSize], [modalSize]);

  return (
    <>
      {customButtonCss && (
        <style>
          {`
            .modal-open-button {
              ${customButtonCss}
            }
          `}
        </style>
      )}

      {/* OPEN BUTTON */}
      {showOpenButton && openType === 'button' && (
        <button
          className="modal-open-button"
          style={{
            background: buttonBackground,
            color: buttonTextColor,
            padding: '10px 20px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          {openButtonIcon && (
            <img
              src={openButtonIcon}
              alt="button-icon"
              width={20}
              height={20}
            />
          )}
          {openButtonLabel}
        </button>
      )}

      {showOpenButton && openType === 'dropdown' && (
        <button
          style={{
            width: dropdownWidth,
            background: buttonBackground,
            color: buttonTextColor,
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          {openButtonLabel}
        </button>
      )}

      {/* MODAL */}
      {open && (
        <div
          onClick={() => closeOnOverlay && setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: overlayColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: modalWidth,
              background: modalBackground,
              color: modalTextColor,
              borderRadius,
              padding: '40px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            className={className}
          >
            {showCloseButton && (
              <button
                className={styles.closeButton}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            )}

            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}

            <DropZone zone="modal-content" />
          </div>
        </div>
      )}
    </>
  );
}
