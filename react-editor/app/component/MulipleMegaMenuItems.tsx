'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Text, View, Divider, Icon, useBreakpointValue } from "@aws-amplify/ui-react";


const ExternalLinkIcon = () => {
    return (
        <Icon fontSize={20}>
            <path
                d="M1.48874 14C1.07272 14 0.720588 13.8559 0.432353 13.5676C0.144118 13.2794 0 12.9273 0 12.5113V1.48874C0 1.07272 0.144118 0.720588 0.432353 0.432353C0.720588 0.144118 1.07272 0 1.48874 0H6.68315V1.23529H1.48874C1.42532 1.23529 1.36726 1.26172 1.31456 1.31456C1.26172 1.36726 1.23529 1.42532 1.23529 1.48874V12.5113C1.23529 12.5747 1.26172 12.6327 1.31456 12.6854C1.36726 12.7383 1.42532 12.7647 1.48874 12.7647H12.5113C12.5747 12.7647 12.6327 12.7383 12.6854 12.6854C12.7383 12.6327 12.7647 12.5747 12.7647 12.5113V7.31685H14V12.5113C14 12.9273 13.8559 13.2794 13.5676 13.5676C13.2794 13.8559 12.9273 14 12.5113 14H1.48874ZM5.12174 9.74606L4.25394 8.87827L11.8969 1.23529H8.64706V0H14V5.35294H12.7647V2.10309L5.12174 9.74606Z"
                fill="url(#paint0_linear_2633_1572)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_2633_1572"
                    x1="7"
                    y1="0"
                    x2="7"
                    y2="14"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop />
                    <stop offset="1" />
                </linearGradient>
            </defs>
        </Icon>
    );
};

export const RightArrowIcon = ({ ...props }) => {
    return (
        <Icon position={"relative"} top={"5px"} fontSize={20} {...props}>
            <path
                d="M-6.5578e-07 1.9975L6.18084 8.5L-8.73135e-08 15.0025L1.90283 17L10 8.5L1.90283 -8.31755e-08L-6.5578e-07 1.9975Z"
                fill="black"
            />
        </Icon>
    );
};

export const LeftArrowIcon = ({ ...props }) => {
    return (
        <Icon fontSize={20} {...props}>
            <path
                d="M7.41016 1.41L2.83016 6L7.41016 10.59L6.00016 12L0.000156665 6L6.00016 -6.16331e-08L7.41016 1.41Z"
                fill="black"
            />
        </Icon>
    );
};

interface LinkItem {
    label: string;
    description?: string;
    href?: string;
    isExternal?: boolean;
    submenu?: Column[];
    info?: boolean;
}

interface Column {
    title?: string;
    subtitle?: string;
    links: LinkItem[];
    showViewAll?: boolean;
    viewAllLink?: string;
}

/* ─── Accordion row — used ONLY in mobile ─── */
const MobileAccordionLink: React.FC<{
    link: LinkItem;
    depth?: number;
    titleStyle?: React.CSSProperties;
    onClose?: () => void;
}> = ({ link, depth = 0, titleStyle, onClose }) => {
    const [open, setOpen] = useState(false);
    const indent = depth * 16;

    /* Has children → accordion */
    if (link.submenu && link.submenu.length > 0) {
        return (
            <View>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => setOpen((p) => !p)}
                    style={{
                        cursor: "pointer",
                        padding: "12px 0",
                        paddingLeft: `${indent}px`,
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                        <Text
                            fontSize={titleStyle?.fontSize || "18px"}
                            fontWeight={500}
                            fontFamily="var(--font-ToyotaType-Regular)"
                            style={link.info ? { color: "#A0A0A0", padding: "8px" } : {}}
                        >
                            {link.label}
                        </Text>
                        {link.description && (
                            <Text fontSize="14px" color="#58595B" fontFamily="var(--font-toyotaDisplay)" fontWeight={300}>
                                {link.description}
                            </Text>
                        )}
                    </Flex>
                    {/* Arrow rotates when open */}
                    <Text
                        style={{
                            fontSize: "20px",
                            lineHeight: 1,
                            display: "inline-block",
                            transition: "transform 0.2s ease",
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            flexShrink: 0,
                        }}
                    >
                        ›
                    </Text>
                </Flex>

                {/* Expanded sub-columns */}
                {open && (
                    <View style={{ background: depth === 0 ? "#fafafa" : "#f3f3f3" }}>
                        {link.submenu.map((col, ci) => (
                            <View key={ci}>
                                {col.title && (
                                    <Text
                                        fontWeight="600"
                                        fontSize="13px"
                                        color="#58595B"
                                        fontFamily="var(--font-toyotaDisplay)"
                                        style={{ padding: `8px 0 4px ${indent + 16}px`, display: "block" }}
                                    >
                                        {col.title}
                                    </Text>
                                )}
                                {col.links.map((subLink, li) => (
                                    <MobileAccordionLink
                                        key={li}
                                        link={subLink}
                                        depth={depth + 1}
                                        titleStyle={titleStyle}
                                        onClose={onClose}
                                    />
                                ))}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    }

    /* No children → plain link */
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            style={{
                padding: "12px 0",
                paddingLeft: `${indent}px`,
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            {link.href ? (
                <Link href={link.href} legacyBehavior>
                    <a
                        style={{ textDecoration: "none", color: "inherit", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={() => onClose?.()}
                    >
                        <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                            <Text
                                fontSize={titleStyle?.fontSize || "18px"}
                                fontWeight={500}
                                fontFamily="var(--font-ToyotaType-Regular)"
                                style={link.info ? { color: "#A0A0A0", padding: "8px" } : {}}
                            >
                                {link.label}
                            </Text>
                            {link.description && (
                                <Text fontSize="14px" color="#58595B" fontFamily="var(--font-toyotaDisplay)" fontWeight={300}>
                                    {link.description}
                                </Text>
                            )}
                        </Flex>
                        {link.isExternal && <ExternalLinkIcon />}
                    </a>
                </Link>
            ) : (
                <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                    <Text
                        fontSize={titleStyle?.fontSize || "18px"}
                        fontWeight={500}
                        fontFamily="var(--font-ToyotaType-Regular)"
                        style={link.info ? { color: "#A0A0A0", padding: "8px" } : {}}
                    >
                        {link.label}
                    </Text>
                    {link.description && (
                        <Text fontSize="14px" color="#58595B" fontFamily="var(--font-toyotaDisplay)" fontWeight={300}>
                            {link.description}
                        </Text>
                    )}
                </Flex>
            )}
        </Flex>
    );
};

const MulipleMegaMenuItems: React.FC<any> = ({
    columns,

    onClose,
    onBack,
    titleStyle,
    linkStyle,
}) => {
    const [activeSubmenus, setActiveSubmenus] = useState<
        { columns: any[]; parentItem: any }[]
    >([]);
    const isMobile = useBreakpointValue({ base: true, xl: false }) || false;

    const handleItemClick = (link: any, level: number) => {
        if (activeSubmenus[level]?.parentItem === link) {
            setActiveSubmenus(activeSubmenus.slice(0, level));
            return;
        }
        if (link.submenu) {
            setActiveSubmenus([
                ...activeSubmenus.slice(0, level),
                { columns: link.submenu, parentItem: link },
            ]);
        }
    };

    useEffect(() => {
        setActiveSubmenus([]);
    }, [columns]);

    // ── MOBILE — accordion, no horizontal overflow ──
    if (isMobile) {
        return (
            <View
                className="mobile-baddie"
                style={{
                    position: "relative",
                    top: "10px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "20px",
                    backgroundColor: "white",
                    zIndex: 1000,
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                {columns.map((column: any, columnIndex: number) => (
                    <View key={columnIndex} style={{ marginBottom: "24px" }}>
                        {column.title && (
                            <Text
                                fontWeight={titleStyle?.fontWeight || "600"}
                                fontSize="18px"
                                marginBottom="10px"
                                color="#000"
                                fontFamily="var(--font-toyotaDisplay)"
                                marginTop={columnIndex > 0 ? "20px" : "0"}
                            >
                                {column.title}
                            </Text>
                        )}
                        {column.subtitle && (
                            <Text fontSize="14px" color="#58595B" marginBottom="20px" fontFamily="var(--font-toyotaDisplay)">
                                {column.subtitle}
                            </Text>
                        )}
                        {column.links.map((link: any, linkIndex: number) => (
                            <MobileAccordionLink
                                key={linkIndex}
                                link={link}
                                depth={0}
                                titleStyle={titleStyle}
                                onClose={onClose}
                            />
                        ))}
                    </View>
                ))}
            </View>
        );
    }

    // ── DESKTOP — completely unchanged from your original ──
    return (
        <View
            padding={{
                xl: "60px",
                medium: "30px",
                base: "10px"
            }}
            style={{
                height: "100%",
                backgroundColor: "white",
                zIndex: 9999999,
                display: "flex",
                flexDirection: "column",
            }}
            onMouseLeave={onClose}
        >
            <Flex gap="0" alignItems="flex-start">
                {/* Render each column separately */}
                {columns.map((column: any, index: number) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <Divider
                                orientation="vertical"
                                style={{
                                    height: "298px",
                                    margin: "0 20px",
                                    borderColor: "#E0E0E0",
                                }}
                            />
                        )}
                        <MenuColumn
                            columns={[column]}
                            level={0}
                            onItemClick={handleItemClick}
                            activeSubmenus={activeSubmenus}
                            titleStyle={titleStyle}
                            linkStyle={linkStyle}
                            onClose={onClose}
                        />
                    </React.Fragment>
                ))}

                {/* Render submenus for the active column */}
                {activeSubmenus.map((submenu: any, level: any) => (
                    <React.Fragment key={level}>
                        <Divider
                            orientation="vertical"
                            style={{
                                height: "400px",
                                margin: "0 40px",
                                borderColor: "#E0E0E0",
                            }}
                        />
                        <MenuColumn
                            columns={submenu.columns}
                            level={level + 1}
                            onItemClick={handleItemClick}
                            activeSubmenus={activeSubmenus}
                            titleStyle={titleStyle}
                            linkStyle={linkStyle}
                            onClose={onClose}
                        />
                    </React.Fragment>
                ))}
            </Flex>
        </View>
    );
};

// Componente reutilizable para columnas del menú — UNCHANGED
const MenuColumn: React.FC<{
    columns: any[];
    level: number;
    onItemClick: (link: any, level: number) => void;
    activeSubmenus: { columns: any[]; parentItem: any }[];
    titleStyle?: React.CSSProperties;
    linkStyle?: React.CSSProperties;
    onClose?: () => void;
}> = ({
    columns,
    level,
    onItemClick,
    activeSubmenus,
    titleStyle,
    linkStyle,
    onClose,
}) => {
        const resolvedTitleFontWeight = titleStyle?.fontWeight ?? "400";
        const resolvedTitleFontSize = titleStyle?.fontSize ?? "18px";

        return (
            <View style={{ width: "280px" }}>
                {columns.map((column: any, columnIndex: number) => (
                    <React.Fragment key={columnIndex}>
                        <View marginTop={columnIndex > 0 ? "20px" : "0"}>
                            <Text
                                fontWeight={resolvedTitleFontWeight}
                                fontSize={resolvedTitleFontSize}
                                marginBottom="38px"
                                color="#58595B"
                                letterSpacing={"0"}
                                fontFamily="var(--font-toyotaDisplay)"
                                lineHeight="140%"
                            >
                                {column.title}
                            </Text>
                            {column.subtitle && (
                                <Text
                                    fontSize="16px"
                                    color="#000"
                                    fontWeight="600"
                                    fontFamily="var(--font-toyotaDisplay)"
                                >
                                    {column.subtitle}
                                </Text>
                            )}
                            <Flex direction="column" gap="8px">
                                {column.links.map((link: any, linkIndex: number) => {
                                    const isActive = activeSubmenus[level]?.parentItem === link;

                                    return (
                                        <Flex
                                            key={linkIndex}
                                            alignItems="center"
                                            justifyContent={
                                                link.label === "Ver todo" ? "start" : "space-between"
                                            }
                                            onClick={() => {
                                                onItemClick(link, level);
                                                if (!link.submenu) {
                                                    onClose?.();
                                                }
                                            }}
                                            style={{
                                                cursor: link.info ? "default" : "pointer",
                                                padding: link.info ? "8px 0 0" : "8px 0px",
                                                marginBottom: link.info ? "-8px" : "inherit",
                                                borderRadius: "4px",
                                                backgroundColor: isActive ? "#f5f5f5" : "transparent",
                                                transition: "background-color 0.2s ease",
                                            }}
                                            onMouseEnter={() => {
                                                if (link.submenu && !isActive) {
                                                    onItemClick(link, level);
                                                }
                                            }}
                                        >
                                            <Flex
                                                direction="column"
                                                gap="0px"
                                                style={{ flex: link.label === "Ver todo" ? 0 : 1 }}
                                            >
                                                {link.href ? (
                                                    <Link
                                                        href={link.href}
                                                        passHref
                                                        target={link.isExternal ? "_blank" : "_self"}
                                                        rel={
                                                            link.isExternal ? "noopener noreferrer" : undefined
                                                        }
                                                        style={{ textDecoration: "none", color: "inherit" }}
                                                        onClick={(e) => {
                                                            if (link.submenu) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <Text
                                                            fontSize={linkStyle?.fontSize || "18px"}
                                                            fontWeight={
                                                                link.label === "Ver todo"
                                                                    ? 500
                                                                    : linkStyle?.fontWeight || 400
                                                            }
                                                            lineHeight={
                                                                link.label === "Ver todo"
                                                                    ? "100%"
                                                                    : linkStyle?.lineHeight || "normal"
                                                            }
                                                            fontFamily={
                                                                link.label === "Ver todo"
                                                                    ? " var(--font-roboto)"
                                                                    : "var(--font-ToyotaType-Regular)"
                                                            }
                                                            style={{
                                                                ...(link.label === "Ver todo"
                                                                    ? {
                                                                        backgroundClip: "text",
                                                                        border: "none",
                                                                        padding: 0,
                                                                        fontFamily: "var(--font-roboto)",
                                                                        fontSize: "14px",
                                                                        fontWeight: 500,
                                                                        fontStyle: "normal",
                                                                        width: "max-content",
                                                                        lineHeight: "normal",
                                                                        textDecorationLine: "underline",
                                                                        textDecorationStyle: "solid",
                                                                        textDecorationSkipInk: "none",
                                                                        textDecorationThickness: "auto",
                                                                        textUnderlineOffset: "auto",
                                                                        textUnderlinePosition: "from-font",
                                                                    }
                                                                    : {}),
                                                                ...(link.info
                                                                    ? { color: "#A0A0A0", fontStyle: "italic" }
                                                                    : {}),
                                                            }}
                                                        >
                                                            {link.label}
                                                        </Text>
                                                    </Link>
                                                ) : (
                                                    <Text
                                                        fontSize={linkStyle?.fontSize || "17px"}
                                                        fontWeight={linkStyle?.fontWeight || 500}
                                                        fontFamily="var(--font-ToyotaType-Regular)"
                                                        style={link.info ? { color: "#A0A0A0" } : {}}
                                                    >
                                                        {link.label}
                                                    </Text>
                                                )}
                                                {link.description && (
                                                    <Text
                                                        fontSize="13px"
                                                        color="#58595B"
                                                        fontFamily="var(--font-toyotaDisplay)"
                                                        fontWeight={300}
                                                    >
                                                        {link.description}
                                                    </Text>
                                                )}
                                            </Flex>
                                            {link.submenu && (
                                                <RightArrowIcon
                                                    style={{
                                                        opacity: isActive ? 1 : 0.6,
                                                        transform: isActive ? "translateX(2px)" : "none",
                                                        transition: "all 0.2s ease",
                                                    }}
                                                />
                                            )}
                                        </Flex>
                                    );
                                })}
                            </Flex>
                        </View>
                    </React.Fragment>
                ))}
            </View>
        );
    };

export default MulipleMegaMenuItems;