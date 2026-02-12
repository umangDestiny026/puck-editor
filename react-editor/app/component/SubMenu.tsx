import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Text, View, Divider, Icon } from "@aws-amplify/ui-react";


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

const RightArrowIcon = ({ ...props }) => {
    return (
        <Icon position={"relative"} top={"5px"} fontSize={20} {...props}>
            <path
                d="M-6.5578e-07 1.9975L6.18084 8.5L-8.73135e-08 15.0025L1.90283 17L10 8.5L1.90283 -8.31755e-08L-6.5578e-07 1.9975Z"
                fill="black"
            />
        </Icon>
    );
};

const LeftArrowIcon = ({ ...props }) => {
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
    submenu?: Column[]; // Para soportar múltiples niveles
    info?: boolean; // Para textos informativos
}

interface Column {
    title?: string;
    subtitle?: string;
    links: LinkItem[];
    showViewAll?: boolean;
    viewAllLink?: string;
}

interface MenuProps {
    columns: Column[];
    isMobile?: boolean;
    onClose?: () => void;
    onBack?: () => void; // Para navegación en mobile
    titleStyle?: React.CSSProperties; // Add this new prop
    linkStyle?: React.CSSProperties; // Add this new prop
}

const SubmenuDropdown: React.FC<MenuProps> = ({
    columns,
    isMobile = false,
    onClose,
    onBack,
    titleStyle, // Added titleStyle here
    linkStyle, // Add this,
}) => {
    const [activeSubmenus, setActiveSubmenus] = useState<
        { columns: Column[]; parentItem: LinkItem }[]
    >([]);

    const handleItemClick = (link: LinkItem, level: number) => {
        // Si el item ya está abierto, lo cerramos
        if (activeSubmenus[level]?.parentItem === link) {
            setActiveSubmenus(activeSubmenus.slice(0, level));
            return;
        }

        // Si tiene submenu, lo mostramos
        if (link.submenu) {
            setActiveSubmenus([
                ...activeSubmenus.slice(0, level),
                { columns: link.submenu, parentItem: link },
            ]);
        }
    };

    useEffect(() => {
        // Resetear submenús cuando cambian las columnas principales
        setActiveSubmenus([]);
    }, [columns]);

    // Implementación para mobile
    if (isMobile) {
        return (
            <View
                style={{
                    position: "fixed",
                    top: "60px",
                    padding: "20px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    backgroundColor: "white",
                    zIndex: 1000,
                    overflowY: "auto",
                }}
            >
                {/* Mostrar el submenú activo o el menú principal */}
                {(activeSubmenus.length > 0
                    ? activeSubmenus[activeSubmenus.length - 1].columns
                    : columns
                ).map((column, columnIndex) => (
                    <View key={columnIndex} style={{ marginBottom: "30px" }}>
                        {/* Botón de retroceso solo si hay submenús activos */}
                        {activeSubmenus.length > 0 && columnIndex === 0 && (
                            <Flex
                                alignItems="center"
                                gap="10px"
                                marginBottom="20px"
                                onClick={() => {
                                    if (activeSubmenus.length === 1) {
                                        onBack?.(); // Volver al menú principal
                                    } else {
                                        setActiveSubmenus(activeSubmenus.slice(0, -1)); // Retroceder un nivel
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <LeftArrowIcon />
                                <Text
                                    fontSize={titleStyle?.fontSize || "18px"}
                                    color="#000"
                                    fontFamily="var(--font-toyotaDisplay)"
                                >
                                    Volver
                                </Text>
                            </Flex>
                        )}

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
                        {column.subtitle && (
                            <Text
                                fontSize="14px"
                                color="#58595B"
                                marginBottom="20px"
                                fontFamily="var(--font-toyotaDisplay)"
                            >
                                {column.subtitle}
                            </Text>
                        )}
                        <Flex direction="column" gap="15px">
                            {column.links.map((link, linkIndex) => (
                                // <Flex
                                //   key={linkIndex}
                                //   alignItems="center"
                                //   justifyContent="space-between"
                                //   onClick={() => {
                                //     if (link.submenu) {
                                //       handleItemClick(link, activeSubmenus.length);
                                //     } else if (link.href) {
                                //       onClose?.();
                                //     }
                                //   }}
                                //   style={{
                                //     cursor: "pointer",
                                //     padding: "12px 0",
                                //     borderBottom: "1px solid #f0f0f0",
                                //   }}
                                // >
                                //   <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                                //     <Text
                                //       fontSize={titleStyle?.fontSize || "18px"}
                                //       fontWeight={500}
                                //       fontFamily="var(--font-ToyotaType-Regular)"
                                //       style={link.info ? { color: "#A0A0A0", padding: "8px" } : {}}
                                //     >
                                //       {link.label}
                                //     </Text>
                                //     {link.description && (
                                //       <Text
                                //         fontSize="14px"
                                //         color="#58595B"
                                //         fontFamily="var(--font-toyotaDisplay)"
                                //         fontWeight={300}
                                //       >
                                //         {link.description}
                                //       </Text>
                                //     )}
                                //   </Flex>
                                //   {/* Only show right arrow for items with submenus */}
                                //   {link.submenu && (
                                //     <RightArrowIcon
                                //       style={{
                                //         opacity: activeSubmenus[activeSubmenus.length - 1]?.parentItem === link ? 1 : 0.6,
                                //         transform: activeSubmenus[activeSubmenus.length - 1]?.parentItem === link ? "translateX(2px)" : "none",
                                //         transition: "all 0.2s ease",
                                //       }}
                                //     />
                                //   )}
                                // </Flex>

                                <Flex
                                    key={linkIndex}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    onClick={() => {
                                        if (link.submenu) {
                                            handleItemClick(link, activeSubmenus.length);
                                        }
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        padding: "12px 0",
                                        borderBottom: "1px solid #f0f0f0",
                                    }}
                                >
                                    {link.href && !link.submenu ? (
                                        <Link href={link.href} legacyBehavior>
                                            <a
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                                onClick={() => onClose?.()}
                                            >
                                                <Flex direction="column" gap="4px" style={{ flex: 1 }}>
                                                    <Text
                                                        fontSize={titleStyle?.fontSize || "18px"}
                                                        fontWeight={500}
                                                        fontFamily="var(--font-ToyotaType-Regular)"
                                                        style={
                                                            link.info
                                                                ? { color: "#A0A0A0", padding: "8px" }
                                                                : {}
                                                        }
                                                    >
                                                        {link.label}
                                                    </Text>
                                                    {link.description && (
                                                        <Text
                                                            fontSize="14px"
                                                            color="#58595B"
                                                            fontFamily="var(--font-toyotaDisplay)"
                                                            fontWeight={300}
                                                        >
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
                                                style={
                                                    link.info ? { color: "#A0A0A0", padding: "8px" } : {}
                                                }
                                            >
                                                {link.label}
                                            </Text>
                                            {link.description && (
                                                <Text
                                                    fontSize="14px"
                                                    color="#58595B"
                                                    fontFamily="var(--font-toyotaDisplay)"
                                                    fontWeight={300}
                                                >
                                                    {link.description}
                                                </Text>
                                            )}
                                        </Flex>
                                    )}

                                    {link.submenu && (
                                        <RightArrowIcon
                                            style={{
                                                opacity:
                                                    activeSubmenus[activeSubmenus.length - 1]
                                                        ?.parentItem === link
                                                        ? 1
                                                        : 0.6,
                                                transform:
                                                    activeSubmenus[activeSubmenus.length - 1]
                                                        ?.parentItem === link
                                                        ? "translateX(2px)"
                                                        : "none",
                                                transition: "all 0.2s ease",
                                            }}
                                        />
                                    )}
                                </Flex>
                            ))}
                        </Flex>
                    </View>
                ))}
            </View>
        );
    }

    // Implementación para desktop
    return (
        <View
            style={{
                position: "fixed",
                top: "60px",
                padding: "60px",
                left: 0,
                right: 0,
                bottom: 0,
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
                {columns.map((column, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <Divider
                                orientation="vertical"
                                style={{
                                    height: "298px", // Fixed height for the separator
                                    margin: "0 20px",
                                    borderColor: "#E0E0E0",
                                }}
                            />
                        )}
                        <MenuColumn
                            columns={[column]} // Pass only one column at a time
                            level={0}
                            onItemClick={handleItemClick}
                            activeSubmenus={activeSubmenus}
                            titleStyle={titleStyle}
                            linkStyle={linkStyle}
                            onClose={onClose} // Pass onClose prop
                        />
                    </React.Fragment>
                ))}

                {/* Render submenus for the active column */}
                {activeSubmenus.map((submenu, level) => (
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
                            onClose={onClose} // Pass onClose prop
                        />
                    </React.Fragment>
                ))}
            </Flex>
        </View>
    );
};

// Componente reutilizable para columnas del menú
const MenuColumn: React.FC<{
    columns: Column[];
    level: number;
    onItemClick: (link: LinkItem, level: number) => void;
    activeSubmenus: { columns: Column[]; parentItem: LinkItem }[];
    titleStyle?: React.CSSProperties; // Add this
    linkStyle?: React.CSSProperties; // Add this
    onClose?: () => void; // Pass onClose from parent
}> = ({
    columns,
    level,
    onItemClick,
    activeSubmenus,
    titleStyle,
    linkStyle,
    onClose, // Receive onClose here
}) => {
        const resolvedTitleFontWeight = titleStyle?.fontWeight ?? "400";
        const resolvedTitleFontSize = titleStyle?.fontSize ?? "18px";

        return (
            <View style={{ width: "280px" }}>
                {columns.map((column, columnIndex) => (
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
                                {column.links.map((link, linkIndex) => {
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
                                            // className={isActive || level > 0 ? styles.active : ""}
                                            style={{
                                                cursor: link.info ? "default" : "pointer",
                                                padding: link.info ? "8px 0 0" : "8px 0px",
                                                marginBottom: link.info ? "-8px" : "inherit",
                                                borderRadius: "4px",
                                                backgroundColor: isActive ? "#f5f5f5" : "transparent",
                                                transition: "background-color 0.2s ease",
                                            }}
                                            onMouseEnter={() => {
                                                // Opcional: abrir al hover en desktop
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
                                                                e.preventDefault(); // Evitar navegación si tiene submenu
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
                                            {/* Only show right arrow for items with submenus */}
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

export default SubmenuDropdown;
