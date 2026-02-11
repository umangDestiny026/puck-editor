'use client';
import { DropZone } from "@puckeditor/core";
import { useEffect, useState } from "react";
import { Heading, Tabs, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const TabsRenderer = ({ tabs, activeTabIndex, className, uniqueClass, customCss, title, subTitle, TabItemPosition, theme = "dark", backgroundColor = "#111827", }) => {
    const [activeTab, setActiveTab] = useState(
        tabs?.[activeTabIndex]?.label || tabs?.[0]?.label
    );

    useEffect(() => {
        if (tabs?.[activeTabIndex]) {
            setActiveTab(tabs[activeTabIndex].label);
        }
    }, [activeTabIndex, tabs]);

    const isDark = theme === "dark";

    return (
        <View className={`puck-tabs ${className || ""} ${uniqueClass || ""}`} backgroundColor={backgroundColor} color={isDark ? "#FFFFFF" : "#000000"}>
            {customCss && (
                <style>{`
                    .${uniqueClass} {
                        ${customCss}
                        }
                    `}
                </style>
            )}
            {
                subTitle && (
                    <Text textAlign="center" margin="1rem auto 0.5rem" color={isDark ? "#FFFFFF" : "#000000"}>{subTitle}</Text>
                )
            }
            {title && (
                <Heading
                    level={2}
                    textAlign="center"
                    marginBottom="1.5rem"
                    color={isDark ? "#FFFFFF" : "#000000"}
                >
                    {title}
                </Heading>
            )}
            <Tabs.Container
                value={activeTab}
                onChange={(value) => setActiveTab(value as unknown as string)}
                width="100%"
            >
                <Tabs.List
                    justifyContent={TabItemPosition}
                    style={{
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        paddingBottom: "8px",
                    }}
                >
                    {tabs.map((tab: any, index: number) => {
                        const isActive = tab.label === activeTab;

                        return (
                            <Tabs.Item
                                key={index}
                                value={tab.label}
                                color={isDark ? "#FFFFFF" : "#000000"}
                                style={{
                                    borderBottomWidth: "4px",
                                    borderBottomColor: isActive
                                        ? isDark
                                            ? "#FFFFFF"      // 👈 active border in dark mode
                                            : "#000000"      // 👈 active border in light mode
                                        : "transparent",   // 👈 hide border when not active
                                }}
                            >
                                {tab.label}
                            </Tabs.Item>
                        );
                    })}
                </Tabs.List>

                {tabs.map((tab: any, index: number) => (
                    <Tabs.Panel
                        key={index}
                        value={tab.label}
                        padding="1.5rem"
                        color={isDark ? "#FFFFFF" : "#000000"}
                    >
                        {tab.defaultContent && (
                            <div style={{ marginBottom: "10px", color: isDark ? "#FFFFFF" : "#000000" }}>
                                {tab.defaultContent}
                            </div>
                        )}

                        <DropZone zone={`tab-${index}`} />
                    </Tabs.Panel>
                ))}
            </Tabs.Container>
        </View>
    );
};

export default TabsRenderer;