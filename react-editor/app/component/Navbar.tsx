import { Flex, Link, Text, View } from '@aws-amplify/ui-react';
import React from 'react'
import { megaMenuStore } from '../zone';
import { Render } from "@puckeditor/core";
import config from '../../puck.config';

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
                                    const isDropdown =
                                        item.menuMode === "dropdown" &&
                                        Array.isArray(item.dropdownItems) &&
                                        item.dropdownItems.length > 0;

                                    const isMegaMenu =
                                        item.menuMode === "megamenu" &&
                                        !!item.savedMegaMenu;

                                    const isOpen = openIndex === i;

                                    if (isMegaMenu && item.savedMegaMenu !== null) {
                                        const content = megaMenuStore.get(item.savedMegaMenu)?.content;
                                        const megaMenuData = megaMenuStore.get(item.savedMegaMenu);
                                        console.log("content megaMenuData", megaMenuData);

                                        const formattedData = {
                                            root: { props: {} },
                                            content: megaMenuData?.content || [],
                                            zones: megaMenuData?.zones || {},
                                        };
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="8"
                                                        viewBox="0 0 12 8"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M10.589 0.294922L5.99902 4.87492L1.40902 0.294922L-0.000976563 1.70492L5.99902 7.70492L11.999 1.70492L10.589 0.294922Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </Text>
                                                {isOpen && isMegaMenu && content && (
                                                    <View
                                                        style={{
                                                            // inset: "60px 0px 0px",
                                                            // display: "flex",
                                                            position: "fixed",
                                                            top: "auto",
                                                            left: 0,
                                                            background: "#fff",
                                                            width: "100vw",
                                                            padding: "20px",
                                                            height: "100%",
                                                            zIndex: 999,
                                                        }}
                                                    >
                                                        <Render data={formattedData} config={config as any} />
                                                    </View>
                                                )
                                                }
                                            </View>
                                        );
                                    }

                                    if (!isDropdown) {
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="8"
                                                        viewBox="0 0 12 8"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M10.589 0.294922L5.99902 4.87492L1.40902 0.294922L-0.000976563 1.70492L5.99902 7.70492L11.999 1.70492L10.589 0.294922Z"
                                                            fill="black"
                                                        />
                                                    </svg>
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
        </View >
    )
}
