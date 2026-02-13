'use client';
import { DropZone } from "@puckeditor/core";
import { useEffect, useState } from "react";
import { Heading, Tabs, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Select } from "./select";

const TabsRenderer = ({
    tabs,
    activeTabIndex,
    className,
    uniqueClass,
    customCss,
    title,
    subTitle,
    TabItemPosition = "center",
    theme = "dark",
    backgroundImage,
    backgroundColor,
}) => {
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
        <View
            className={`puck-tabs ${className || ""} ${uniqueClass || ""}`}
            padding={{ base: "2rem 1rem", xl: "60px 0 80px 0" }}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage}
        >
            {customCss && (
                <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
            )}

            {/* Subtitle */}
            {subTitle && (
                <Text
                    textAlign="center"
                    fontSize={{ base: "16px", xl: "18px" }}
                    margin="0 auto 0.5rem"
                    color={isDark ? "#FFFFFF" : "#000000"}
                >
                    {subTitle}
                </Text>
            )}

            {/* Title */}
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
                onValueChange={(value) => setActiveTab(value)}
            >
                {/* ✅ Mobile Select (like reference) */}
                <View
                    margin="20px auto"
                    display={{ base: "block", xl: "none" }}
                    maxWidth="230px"
                    minHeight="48px"
                    maxHeight="48px"
                >
                    <Select
                        options={tabs.map((tab) => ({
                            value: tab.label,
                            label: tab.label,
                        }))}
                        selectedOption={
                            activeTab ? { value: activeTab, label: activeTab } : null
                        }
                        onSelect={(selected) => {
                            if (selected?.value) {
                                setActiveTab(selected.value);
                            }
                        }}
                        // theme="dark"
                        customControlStyles={{
                            minHeight: "48px",
                            textAlign: "center",
                            textAlignLast: "center",
                        }}
                        placeholder="Select tab"
                    />
                </View>

                {/* ✅ Desktop Tabs */}
                <Tabs.List
                    justifyContent={TabItemPosition}
                    width="max-content"
                    direction={{ base: "column", xl: "row" }}
                    margin="32px auto 43px"
                    display={{ base: "none", xl: "flex" }}
                >
                    {tabs.map((tab, index) => {
                        const isActive = tab.label === activeTab;

                        return (
                            <Tabs.Item
                                key={index}
                                value={tab.label}
                                color={isDark ? "#FFFFFF" : "#000000"}
                                fontSize={{ base: "14px", xl: "18px" }}
                                fontWeight={400}
                                style={{
                                    borderBottomWidth: "4px",
                                    borderBottomColor: isActive
                                        ? isDark
                                            ? "#FFFFFF"
                                            : "#000000"
                                        : "transparent",
                                }}
                            >
                                {tab.label}
                            </Tabs.Item>
                        );
                    })}
                </Tabs.List>

                {/* ✅ Panels */}
                {tabs.map((tab: any, index: number) => (
                    <Tabs.Panel
                        key={index}
                        value={tab.label}
                        padding={{ base: "1rem 0", xl: "1.5rem 0" }}
                        color={isDark ? "#FFFFFF" : "#000000"}
                    >
                        {tab.defaultContent && (
                            <div style={{ marginBottom: "10px" }}>
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