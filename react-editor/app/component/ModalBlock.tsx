"use client";

import React, { useEffect, useState } from "react";
import { DropZone } from "@puckeditor/core";
import styles from "./modal.module.css";

const ModalBlock = ({
    title,
    description,
    showOpenButton,
    openButtonLabel,
    openType,
    modalSize,
    showCloseButton,
    closeOnOverlay,
    showModalButton = true,
    modalBackground,
    modalTextColor,
    overlayColor,
    customButtonCss,
    buttonBackground,
    openButtonIcon,
    buttonTextColor,
    borderRadius,
    dropdownWidth,
    className,
}) => {
    const [open, setOpen] = React.useState(showModalButton);

    useEffect(() => {
        setOpen(showModalButton);
    }, [showModalButton]);

    const getWidth = () => {
        switch (modalSize) {
            case "full":
                return "100vw";
            case "large":
                return "80%";
            case "medium":
                return "60%";
            case "half":
                return "50%";
            case "small":
                return "400px";
            case "fixed":
                return "600px";
            default:
                return "60%";
        }
    };

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
            {showOpenButton && openType === "button" && (
                <button
                    className="modal-open-button"
                    style={{
                        background: buttonBackground,
                        color: buttonTextColor,
                        padding: "10px 20px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                    onClick={() => setOpen(true)}
                >
                    {openButtonIcon && (
                        <img
                            src={openButtonIcon}
                            alt="button-icon"
                            style={{
                                width: "20px",
                                height: "20px",
                                objectFit: "contain",
                            }}
                        />
                    )}

                    {openButtonLabel}
                </button>
            )}

            {openType === "dropdown" && (
                <button
                    style={{
                        width: dropdownWidth,
                        background: buttonBackground,
                        color: buttonTextColor,
                        padding: "10px",
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {openButtonLabel}
                </button>
            )}

            {open && (
                <div
                    onClick={() => closeOnOverlay && setOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: overlayColor,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: getWidth(),
                            background: modalBackground,
                            color: modalTextColor,
                            borderRadius,
                            padding: "40px",
                            position: "relative",
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

                        <h2>{title}</h2>
                        <p>{description}</p>

                        <DropZone zone="modal-content" />
                    </div>
                </div>
            )}
        </>
    );
};


export default ModalBlock;