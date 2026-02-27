/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    useBreakpointValue,
    Flex,
    Button,
} from "@aws-amplify/ui-react";

// Define types for timeline items
interface TimelineItem {
    year: string;
    title: string;
    description?: string;
    icon?: string;
    iconAlt?: string;
    images?: Array<{
        src: string;
        alt: string;
        width?: string | number | ResponsiveValue;
        height?: string | number | ResponsiveValue;
    }>;
    expandedContent?: React.ReactNode;
    initiallyExpanded?: boolean;
}

// Define responsive value type
type ResponsiveValue = {
    base?: string | number;
    md?: string | number;
    xl?: string | number;
};

// Define style props interface
interface StyleProps {
    [key: string]: string | number | ResponsiveValue | undefined;
}

// Main component props
interface ToyotaHistoryTimelineProps {
    title?: string;
    subtitle?: string;
    items: TimelineItem[];
    bgColor?: string;
    textColor?: string;
    accentColor?: string;
    expandButtonColor?: string;
    titleStyle?: StyleProps;
    subtitleStyle?: StyleProps;
    itemStyle?: StyleProps;
    yearStyle?: StyleProps;
    containerStyle?: StyleProps;
    periodStartYear?: string;
    periodEndYear?: string;
    periodSummary?: string;
    periodIcon?: string;
    periodIconAlt?: string;
}

const styles = {
    titleStyle: {
        fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
        fontWeight: { base: "400" },
        marginBottom: { base: "0.5rem", xl: "0.75rem" },
        fontFamily: {
            base: "var(--font-ToyotaType-Regular)",
            xl: "var(--font-ToyotaType-Regular)",
        },
    },
    subtitleStyle: {
        fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
        fontWeight: { base: "600" },
        marginBottom: { base: "2rem", xl: "3rem" },
        fontFamily: {
            base: "var(--font-toyotaDisplay)",
            xl: "var(--font-toyotaDisplay)",
        },
    },
    itemStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "400" },
    },
    yearStyle: {
        fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
        fontWeight: { base: "600" },
    },
    containerStyle: {
        padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
    },
}

const HistoryTimelineConfig: React.FC<ToyotaHistoryTimelineProps> = (
    props
) => {

    const styles = {
        titleStyle: {
            fontSize: { base: "1rem", md: "1.125rem", xl: "1.25rem" },
            fontWeight: { base: "400" },
            marginBottom: { base: "0.5rem", xl: "0.75rem" },
            fontFamily: {
                base: "var(--font-ToyotaType-Regular)",
                xl: "var(--font-ToyotaType-Regular)",
            },
        },
        subtitleStyle: {
            fontSize: { base: "2rem", md: "2.5rem", xl: "3rem" },
            fontWeight: { base: "600" },
            marginBottom: { base: "2rem", xl: "3rem" },
            fontFamily: {
                base: "var(--font-toyotaDisplay)",
                xl: "var(--font-toyotaDisplay)",
            },
        },
        itemStyle: {
            fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
            fontWeight: { base: "400" },
        },
        yearStyle: {
            fontSize: { base: "0.875rem", md: "1rem", xl: "1.125rem" },
            fontWeight: { base: "600" },
        },
        containerStyle: {
            padding: { base: "0 1rem", md: "0 2rem", xl: "0 3rem" },
        },
    }
    // Setup responsive breakpoints
    const isMobile = useBreakpointValue({ base: true, large: false }) || false;
    const isDesktop = useBreakpointValue({ base: false, large: true }) || false;

    // State for period expanded status
    const [isPeriodExpanded, setIsPeriodExpanded] = useState<boolean>(true);

    // Helper function to resolve responsive values
    const resolveResponsiveValue = (
        value?: string | number | ResponsiveValue
    ): string | number | undefined => {
        if (typeof value === "string" || typeof value === "number") return value;
        if (typeof value === "object" && value !== null) {
            if (isDesktop) return value.xl ?? value.md ?? value.base;
            return value.base;
        }
        return undefined;
    };

    // Default or provided values
    const title = props.title || "Historia";
    const subtitle = props.subtitle || "Toyota en Colombia";
    const bgColor = props.bgColor || "#000000";
    const textColor = props.textColor || "#ffffff";
    const accentColor = props.accentColor || "#c8312b";
    const expandButtonColor = props.expandButtonColor || "#ffffff";

    // Default period values
    const hasPeriodData = !!(props.periodStartYear && props.periodEndYear);
    const periodStartYear = props.periodStartYear || "";
    const periodEndYear = props.periodEndYear || "";
    const periodSummary = props.periodSummary || "";
    const periodIcon = props.periodIcon || "";
    const periodIconAlt = props.periodIconAlt || "Period icon";

    // Derive period years from items if not provided
    const derivedPeriodStartYear =
        !hasPeriodData && props.items.length > 0
            ? props.items.reduce(
                (min, item) =>
                    parseInt(item.year) < parseInt(min) ? item.year : min,
                props.items[0].year
            )
            : "";

    const derivedPeriodEndYear =
        !hasPeriodData && props.items.length > 0
            ? props.items.reduce(
                (max, item) =>
                    parseInt(item.year) > parseInt(max) ? item.year : max,
                props.items[0].year
            )
            : "";

    // Toggle period expanded state
    const togglePeriodExpand = () => {
        setIsPeriodExpanded((prev) => !prev);
    };

    // Render the period summary header with small "Ver Menos" button
    // Render the period summary header with title + subtitle
    const renderPeriodHeader = () => {
        const startYear = hasPeriodData
            ? periodStartYear
            : derivedPeriodStartYear;

        const endYear = hasPeriodData
            ? periodEndYear
            : derivedPeriodEndYear;

        return (
            <View marginBottom="3rem">
                {/* Title */}
                {props.title && (
                    <Text
                        color={textColor}
                        fontSize={styles?.titleStyle?.fontSize}
                        fontWeight={styles?.titleStyle?.fontWeight}
                        marginBottom={styles?.titleStyle?.marginBottom}
                        fontFamily={styles?.titleStyle?.fontFamily}
                        textAlign="center"
                    >
                        {props.title}
                    </Text>
                )}

                {/* Subtitle */}
                {props.subtitle && (
                    <Text
                        color={textColor}
                        fontSize={styles?.subtitleStyle?.fontSize}
                        fontWeight={styles?.subtitleStyle?.fontWeight}
                        marginBottom={styles?.subtitleStyle?.marginBottom}
                        fontFamily={styles?.subtitleStyle?.fontFamily}
                        textAlign="center"
                    >
                        {props.subtitle}
                    </Text>
                )}

                {/* Year Range Header */}
                {(props.startYear || props.endYear) && (
                    <View
                        backgroundColor={bgColor}
                        padding="0.5rem 1rem"
                        margin="0 auto"
                        width="fit-content"
                    >
                        <Text
                            color={textColor}
                            fontSize={styles?.yearStyle?.fontSize}
                            fontWeight={styles?.yearStyle?.fontWeight}
                            textAlign="center"
                        >
                            {props.startYear}
                            {props.startYear && props.endYear && (
                                <>
                                    {" "}
                                    <Text as="span" color={props.accentColor}>
                                        {"//"}
                                    </Text>{" "}
                                </>
                            )}
                            {props.endYear}
                        </Text>
                    </View>
                )}

                {/* Period Summary Box */}
                {(periodSummary || props.items[0]?.description) && (
                    <View
                        backgroundColor="#1e1e1e"
                        padding={{ base: ".9375rem", md: "1.5rem" }}
                        borderRadius="20px"
                        margin="1.5rem auto 0 auto"
                        maxWidth="500px"
                        width={{ base: "294px", md: "auto" }}
                    >
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                        >
                            {/* Icon */}
                            {(periodIcon || props.items[0]?.icon) && (
                                <Image
                                    src={periodIcon || props.items[0]?.icon}
                                    alt={periodIconAlt}
                                    width={{ base: "25px", md: "36px" }}
                                    height={{ base: "25px", md: "36px" }}
                                    marginBottom="1rem"
                                />
                            )}

                            {/* Summary Text */}
                            <Text
                                color={textColor}
                                fontSize={styles?.itemStyle?.fontSize}
                                fontWeight={styles?.itemStyle?.fontWeight}
                                textAlign="center"
                            >
                                {periodSummary ||
                                    props.items[0]?.description ||
                                    ""}
                            </Text>
                        </Flex>
                    </View>
                )}

                {/* Expand / Collapse Button */}
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    padding="1.5rem 0"
                >
                    <Button
                        backgroundColor="transparent"
                        color={props.expandButtonColor}
                        onClick={togglePeriodExpand}
                        padding="0.25rem 0.5rem"
                        fontSize="0.75rem"
                        borderRadius="0"
                    >
                        {isPeriodExpanded ? "Ver Menos —" : "Ver Más +"}
                    </Button>
                </Flex>
            </View>
        );
    };

    return (
        <View
            width="100%"
            backgroundColor={props.bgColor}
            padding="3rem 1rem"
            color={props.textColor}
        >
            <View
                maxWidth="1200px"
                margin="0 auto"
                padding={resolveResponsiveValue(styles?.containerStyle?.padding) || "0"}
            >
                {/* Period Header */}
                {renderPeriodHeader()}

                {/* Timeline Items - Only show if period is expanded */}
                {isPeriodExpanded && (
                    // Modified Timeline Component with central timeline bar

                    // Inside your component, update the Flex container that holds the two columns:

                    <Flex
                        direction={{ base: "column", medium: "row" }}
                        marginTop="2rem"
                        justifyContent="space-between"
                        position="relative" // Add this to position the timeline bar
                    >
                        {/* Central Timeline Bar with dots at beginning, 20% mark, and end */}
                        <View
                            position="absolute"
                            top="0"
                            bottom="0"
                            left="50%"
                            width="2px"
                            style={{
                                borderLeft: "1px dashed #58595b",
                            }}
                            transform="translateX(-50%)"
                            display={{ base: "none", medium: "block" }} // Hide on mobile
                        >
                            {/* Top dot */}
                            <View
                                position="absolute"
                                top="-6px"
                                left="-3px"
                                width="6px"
                                height="6px"
                                backgroundColor="#58595b"
                                borderRadius="50%"
                            />

                            {/* 20% position dot */}
                            <View
                                position="absolute"
                                top="15%"
                                left="-3px"
                                width="6px"
                                height="6px"
                                backgroundColor="#c8312b"
                                borderRadius="50%"
                            />

                            {/* 20% position dot */}
                            <View
                                position="absolute"
                                top="39%"
                                left="-3px"
                                width="6px"
                                height="6px"
                                backgroundColor="#c8312b"
                                borderRadius="50%"
                            />

                            {/* Bottom dot */}
                            <View
                                position="absolute"
                                bottom="-6px"
                                left="-3px"
                                width="6px"
                                height="6px"
                                backgroundColor="#58595b"
                                borderRadius="50%"
                            />
                        </View>

                        {/* Left Column - 45% width */}
                        <View width={{ base: "100%", medium: "45%" }} position="relative">
                            {props.items?.filter((_, i) => i % 2 === 0)
                                .map((item, index) => (
                                    <View
                                        key={`left-${item.year}`}
                                        // marginTop={index === 0 ? "7rem" : "25rem"}
                                        marginTop={{
                                            base: "0",
                                            xl: index === 0 ? "7rem" : "25rem",
                                        }}
                                        position="relative"
                                    >
                                        {/* Year Badge - Now as a red box */}
                                        <View
                                            backgroundColor="#40090c"
                                            padding="0.625rem"
                                            width="fit-content"
                                        >
                                            <Text color="#d42324" fontSize="1.25rem" fontWeight="500">
                                                {item.year}
                                            </Text>
                                        </View>

                                        {/* Rest of your existing item content */}
                                        <Text
                                            color="#c8312b"
                                            fontSize="1.25rem"
                                            fontWeight="400"
                                            marginTop="0.625rem"
                                        >
                                            {item.title}
                                        </Text>

                                        {/* Main image */}
                                        {item.images && item.images.length > 0 && (
                                            <Image
                                                src={item.images[0].src}
                                                alt={item.images[0].alt}
                                                width="100%"
                                                marginTop="0.5rem"
                                                objectFit="contain"
                                                height="auto"
                                            />
                                        )}

                                        {/* Description */}
                                        {item.description && (
                                            <Text
                                                fontSize={{ base: "14px", medium: "1.25rem" }}
                                                lineHeight="1.75"
                                                color="#ffffff"
                                                marginTop="3.5rem"
                                            >
                                                {item.description}
                                            </Text>
                                        )}

                                        {/* Additional images */}
                                        {item.images && item.images.length > 1 && (
                                            <Flex direction="column" gap="1rem" marginTop="3rem">
                                                {item.images.slice(1).map((img, imgIndex) => (
                                                    <Image
                                                        key={`img-left-${index}-${imgIndex + 1}`}
                                                        src={img.src}
                                                        alt={img.alt}
                                                        width="100%"
                                                        height="auto"
                                                    />
                                                ))}
                                            </Flex>
                                        )}
                                    </View>
                                ))}
                        </View>

                        {/* Right Column - 45% width */}
                        <View width={{ base: "100%", medium: "45%" }} position="relative">
                            {props.items
                                .filter((_, i) => i % 2 === 1)
                                .map((item, index) => (
                                    <View
                                        key={`right-${item.year}`}
                                        marginTop={index === 0 ? "25rem" : "25rem"}
                                        position="relative"
                                    >
                                        <Flex alignItems="flex-start" gap="5px">
                                            {/* Content column */}
                                            <View flexGrow="1">
                                                {/* Year Badge - Now as a red box */}
                                                <View
                                                    backgroundColor="#40090c"
                                                    padding="0.625rem"
                                                    width="fit-content"
                                                >
                                                    <Text
                                                        color="#d42324"
                                                        fontSize="1.25rem"
                                                        fontWeight="500"
                                                    >
                                                        {item.year}
                                                    </Text>
                                                </View>

                                                {/* Item Title */}
                                                <Text
                                                    color="#c8312b"
                                                    fontSize="1.25rem"
                                                    fontWeight="400"
                                                    marginTop="0.625rem"
                                                >
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </Flex>

                                        {/* Content section - right aligned */}
                                        <View marginTop="8rem" alignSelf="flex-end">
                                            {/* Main image */}
                                            {item.images && item.images.length > 0 && (
                                                <Image
                                                    src={item.images[0].src}
                                                    alt={item.images[0].alt}
                                                    width="100%"
                                                    objectFit="contain"
                                                    height="auto"
                                                />
                                            )}

                                            {/* Description */}
                                            {item.description && (
                                                <Text
                                                    fontSize="1.25rem"
                                                    lineHeight="1.75"
                                                    color="#ffffff"
                                                    marginTop="3.5rem"
                                                >
                                                    {item.description}
                                                </Text>
                                            )}

                                            {/* Additional images */}
                                            {item.images && item.images.length > 1 && (
                                                <Flex direction="column" gap="1rem" marginTop="3rem">
                                                    {item.images.slice(1).map((img, imgIndex) => (
                                                        <Image
                                                            key={`img-right-${index}-${imgIndex + 1}`}
                                                            src={img.src}
                                                            alt={img.alt}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    ))}
                                                </Flex>
                                            )}
                                        </View>
                                    </View>
                                ))}
                        </View>
                    </Flex>
                )}
            </View>
        </View>
    );
};


export default HistoryTimelineConfig;