import { Flex, Link, Text, View } from '@aws-amplify/ui-react';
import { DropZone } from '@puckeditor/core';
import React from 'react'

export default function Navbar({
    backgroundColor,
    textColor,
    logoUrl,
    menuItems = [],
    rightLinks = [],
    hamburgerIcon,
    navPosition,
    layout,
    menuMode
}) {

    console.log("menuItems", menuItems);
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    const uniqueClass = `header-${Math.random().toString(36).slice(2, 9)}`;
    const defaultHamburger =
        "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg";
    return (
        <View
            backgroundColor={backgroundColor}
            color={textColor}
            className={`${uniqueClass} nav-${navPosition}`}
            padding="16px 24px"
        >
            <style>{`
                .${uniqueClass} a { text-decoration: none; }
        
                .${uniqueClass}.nav-sticky {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                  }
        
                  .${uniqueClass}.nav-fixed {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                  }
        
                  /* Prevent content jump when navbar is fixed */
                  body:has(.${uniqueClass}.nav-fixed) {
                    padding-top: 72px;
                  }
        
                /* --- DESKTOP --- */
                .${uniqueClass} .desktop-nav { display: flex; }
                .${uniqueClass} .hamburger-btn { display: none; }
                .${uniqueClass} .mobile-panel { display: none; }
        
                /* --- TABLET & MOBILE --- */
                @media (max-width: 900px) {
                  .${uniqueClass} .desktop-nav { display: none; }
                  .${uniqueClass} .hamburger-btn { display: block; }
        
                  .${uniqueClass} .mobile-panel {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100vh;
                    background: white;
                    box-shadow: -4px 0 12px rgba(0,0,0,.15);
                    transform: translateX(100%);
                    transition: transform .3s ease;
                    z-index: 9999;
                    display: block;
                  }
        
                  .${uniqueClass} .mobile-panel.open {
                    transform: translateX(0);
                  }
        
                  .${uniqueClass} .mobile-item {
                    padding: 14px 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              `}</style>

            <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap="24px"
            >
                {/* LOGO */}
                <Link href="/">
                    <img src={logoUrl} style={{ height: "32px" }} />
                </Link>

                {layout === "LogoMenu" && (
                    <Flex className="desktop-nav" direction="row" gap="24px">

                        {menuItems.map((item, i) => {
                            const hasDropdown =
                                Array.isArray(item.dropdownItems) &&
                                item.dropdownItems.length > 0 || menuMode === "dropdown";

                            const isOpen = openIndex === i;

                            // -------- SIMPLE LINK (NO DROPDOWN) --------
                            if (!hasDropdown) {
                                return (
                                    <Link key={i} href={item.href} color={textColor}>
                                        {item.label}
                                    </Link>
                                );
                            }

                            // -------- DROPDOWN ITEM --------
                            return (
                                <View key={i} style={{ position: "relative" }}>

                                    <Text
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        {item.label}
                                        <span style={{ fontSize: "12px" }}>
                                            {isOpen ? "▲" : "▼"}
                                        </span>
                                    </Text>

                                    {isOpen && (
                                        <View
                                            className="dropdown-panel"
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                background: "#ffffff",
                                                minWidth: "220px",
                                                boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                                                borderRadius: "6px",
                                                zIndex: 999,
                                            }}
                                        >
                                            {item.dropdownItems.map((d: any, j: number) => (
                                                <Link
                                                    key={j}
                                                    href={d.href}
                                                    style={{
                                                        display: "block",
                                                        padding: "10px 14px",
                                                        borderBottom: "1px solid #eee",
                                                    }}
                                                >
                                                    {d.label}
                                                </Link>
                                            ))}
                                        </View>
                                    )}

                                </View>
                            );
                        })}

                    </Flex>
                )}
                {
                    layout === "LogoMenuCTA" && (
                        <>
                            <Flex className="desktop-nav" direction="row" gap="24px">

                                {menuItems.map((item, i) => {
                                    const hasDropdown =
                                        Array.isArray(item.dropdownItems) &&
                                        item.dropdownItems.length > 0 || menuMode === "dropdown";
                                    const isMegaMenu = menuMode === "megamenu";

                                    const isOpen = openIndex === i;

                                    if (!hasDropdown) {
                                        return (
                                            <Link key={i} href={item.href} color={textColor}>
                                                {item.label}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <View key={i} style={{ position: "relative" }}>

                                            <Text
                                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                                style={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                }}
                                            >
                                                {item.label}
                                                <span style={{ fontSize: "12px" }}>
                                                    {isOpen ? "▲" : "▼"}
                                                </span>
                                            </Text>

                                            {isOpen && (
                                                <View
                                                    className="dropdown-panel"
                                                    style={{
                                                        position: "absolute",
                                                        top: "100%",
                                                        left: 0,
                                                        background: "#ffffff",
                                                        minWidth: "220px",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                                                        borderRadius: "6px",
                                                        zIndex: 999,
                                                    }}
                                                >
                                                    {item.dropdownItems.map((d: any, j: number) => (
                                                        <Link
                                                            key={j}
                                                            href={d.href}
                                                            style={{
                                                                display: "block",
                                                                padding: "10px 14px",
                                                                borderBottom: "1px solid #eee",
                                                            }}
                                                        >
                                                            {d.label}
                                                        </Link>
                                                    ))}
                                                </View>
                                            )}

                                        </View>
                                    );
                                })}
                            </Flex>

                            <Flex className="desktop-nav" direction="row" gap="16px" alignItems="center">
                                {rightLinks.map((r, i) => (
                                    <Link
                                        key={i}
                                        href={r.href}
                                        color={textColor}
                                        style={{ display: "flex", alignItems: "center", gap: "6px" }}
                                    >
                                        {r.icon && <img src={r.icon} style={{ height: "18px" }} />}
                                        {r.label}
                                    </Link>
                                ))}
                            </Flex>
                        </>
                    )
                }
                {
                    layout === "LogoCTA" && (
                        <>
                            <Flex className="desktop-nav" direction="row" gap="16px" alignItems="center">
                                {rightLinks.map((r, i) => (
                                    <Link
                                        key={i}
                                        href={r.href}
                                        color={textColor}
                                        style={{ display: "flex", alignItems: "center", gap: "6px" }}
                                    >
                                        {r.icon && <img src={r.icon} style={{ height: "18px" }} />}
                                        {r.label}
                                    </Link>
                                ))}
                            </Flex>
                        </>
                    )
                }

                {/* HAMBURGER (MOBILE/TABLET) */}
                <button
                    className="hamburger-btn"
                    onClick={() =>
                        document.querySelector(`.${uniqueClass} .mobile-panel`)
                            ?.classList.add("open")
                    }
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <img
                        src={hamburgerIcon || defaultHamburger}
                        style={{ height: "26px" }}
                    />
                </button>
            </Flex>

            {/* ===== MOBILE SLIDE PANEL ===== */}
            <View className="mobile-panel">
                {/* TOP: LOGO + CLOSE */}
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="16px 20px"
                    style={{ borderBottom: "1px solid #eee" }}
                >
                    <img src={logoUrl} style={{ height: "28px" }} />

                    <button
                        onClick={() =>
                            document
                                .querySelector(`.${uniqueClass} .mobile-panel`)
                                ?.classList.remove("open")
                        }
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>
                </Flex>

                {/* MENU ITEMS (VERTICAL LIKE YOUR IMAGE) */}
                {
                    layout === "LogoMenu" && (
                        <View>
                            {menuItems.map((item, i) => (
                                <Link key={i} href={item.href} className="mobile-item" color={textColor}>
                                    <span>{item.label}</span>
                                    <span>›</span>
                                </Link>
                            ))}
                        </View>
                    )
                }

                {
                    layout === "LogoMenuCTA" && (
                        <>
                            <View>
                                {menuItems.map((item, i) => (
                                    <Link key={i} href={item.href} className="mobile-item" color={textColor}>
                                        <span>{item.label}</span>
                                        <span>›</span>
                                    </Link>
                                ))}
                            </View>

                            <View padding="20px">
                                {rightLinks.map((r, i) => (
                                    <Text key={i} fontWeight="bold" marginBottom="10px">
                                        {r.label}
                                    </Text>
                                ))}

                                {rightLinks.find((r) => r.icon) && (
                                    <img
                                        src={rightLinks.find((r) => r.icon)?.icon}
                                        style={{ height: "28px", marginTop: "8px" }}
                                    />
                                )}
                            </View>
                        </>
                    )
                }

                {/* BOTTOM UTILITIES */}
                {
                    layout === "LogoCTA" && (
                        <View padding="20px">
                            {rightLinks.map((r, i) => (
                                <Text key={i} fontWeight="bold" marginBottom="10px">
                                    {r.label}
                                </Text>
                            ))}

                            {rightLinks.find((r) => r.icon) && (
                                <img
                                    src={rightLinks.find((r) => r.icon)?.icon}
                                    style={{ height: "28px", marginTop: "8px" }}
                                />
                            )}
                        </View>
                    )
                }

            </View>
        </View>
    )
}
