'use client';

import { Flex, Link, Text, View } from "@aws-amplify/ui-react";
import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

const Footer: React.FC<any> = ({
    layout = "linksOnly",
    columns = [],
    infoTitle,
    infoText,
    socialLinks = [],
    backgroundColor,
    textColor,
    className = "",
    customCss,
    gap = "40px",
}) => {
    const uniqueClass = useMemo(
        () => `footer-${Math.random().toString(36).substr(2, 9)}`,
        []
    );

    return (
        <View
            backgroundColor={backgroundColor}
            color={textColor}
            className={`${className || ""} ${uniqueClass}`}
            padding="40px"
        >
            {customCss && (
                <style>{`.${uniqueClass} { ${customCss} }`}</style>
            )}

            <Flex
                direction="row"
                wrap="wrap"
                gap={gap || "40px"}
                marginBottom={"30px"}
                justifyContent={layout === "linksOnly" ? "center" : "space-between"}
            >
                {(layout === "infoAndLinks" ||
                    layout === "infoAndLinksSocial") && (
                        <View maxWidth="300px">
                            <>
                                {infoTitle && (
                                    <Text fontSize="20px" fontWeight="bold">
                                        {infoTitle}
                                    </Text>
                                )}

                                {infoText && (
                                    <Text fontSize="14px" marginTop="8px">
                                        {infoText}
                                    </Text>
                                )}
                            </>
                            {/* <DropZone zone="text-zone" /> */}
                        </View>
                    )}

                {/* LINKS SECTION */}
                <Flex direction="row" gap={gap || "40px"} wrap="wrap">
                    {columns.map((col: any, i: number) => (
                        <View key={i}>
                            {col.title && (
                                <Text fontWeight="bold" marginBottom="8px">
                                    {col.title}
                                </Text>
                            )}

                            <Flex direction="column" gap="6px">
                                {(col.links || []).map((link: any, j: any) => (
                                    <Link
                                        key={j}
                                        href={link.href || "#"}
                                        color={textColor}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </Flex>
                        </View>
                    ))}
                </Flex>
                {layout === "infoAndLinksSocial" && socialLinks.length > 0 && (
                    <View minWidth="160px">
                        <Text fontWeight="bold" marginBottom="8px">
                            Social
                        </Text>

                        <Flex direction="column" gap="8px">
                            {socialLinks.map((social: any, i: number) => (
                                <Link
                                    key={i}
                                    href={social.href || "#"}
                                    color={textColor}
                                    display="flex"
                                    style={{
                                        alignItems: "center",
                                        gap: "8px"
                                    }}
                                >
                                    {social.icon && (
                                        <img src={social.icon} className={`icon-${social.label}`} />
                                    )}
                                    {social.label}
                                </Link>
                            ))}
                        </Flex>
                    </View>
                )}

            </Flex>
            <DropZone zone="text-zone" />
        </View>
    );
};

export default Footer;