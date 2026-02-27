// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import {
  Grid,
  View,
  Flex,
  Text,
  Image,
  Heading,
  Button as AmplifyButton,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./SliderSection.css";
import Button from "../Layout/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export enum SliderSectionTheme {
  Dark = "dark",
  Light = "light",
}

// Updated logo interface to support responsive properties
export interface LogoImage {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export interface SliderSectionItem {
  image?: {
    src: string;
    alt: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  };
  title: string;
  description: string;
  secondaryDescription?: string;
  primaryTitlePoints?: string[];
  bulletPoints?: string[];
  logos?: LogoImage[];
  mobileLogos?: LogoImage[];
  desktopLogos?: LogoImage[];
}

export interface SliderSectionProps {
  theme: SliderSectionTheme;
  color?: string;
  title?: string;
  headingAs?: 1 | 2 | 3 | 4 | 5 | 6;
  description?: string;
  subtitleAs?: 1 | 2 | 3 | 4 | 5 | 6;
  textAlignment?: string;
  SliderBgColor?: string;
  items: SliderSectionItem[];
  showPagination?: boolean;
  paginationWidth?: string;
  paginationLeft?: string;
  paginationBottom?: string;
  displayType?: "card" | "standard";
  showButton?: boolean;
  paginationClassName?: string;
  showImageReference?: boolean;
  customButtonWidth?: string; // Add this new property
  customFontHeading?: string; // Add this new property
  customFontDescription?: string;
  customButtonPadding?: string; // Add this new property
  customPaddingDesc?: string | object;
  customDescriptionPadding?: string; // Add this new property
  Headingpadding?: string | object;
  imagePadding?: string | object;
  paddingBottom?: string | object;
  Bgcolor?: string;
  customStyles?: {
    padding?: {
      base?: string;
      xl?: string;
    };
    maxWidth?: {
      base?: string;
      xl?: string;
    };
    margin?: {
      base?: string;
      xl?: string;
    };
  };
  minHeight?: {
    base?: string;
    medium?: string;
    xl?: string;
    xxl?: string;
  };
  className?: string;
}

export function SliderSection({
  theme = "ffffff",
  color = "#000",
  title,
  headingAs = 2,
  description,
  subtitleAs = 5,
  textAlignment,
  items,
  displayType = "standard",
  showButton = false,
  showImageReference = false,
  showPagination = false,
  SliderBgColor = "#000",
  customStyles = {},
  className = "",
  customButtonWidth, // Add this parameter
  customButtonPadding, // Add this parameter
  customDescriptionPadding, // Add this parameter
  customFontHeading = "30px",
  customPaddingDesc,
  paginationWidth = "auto",
  paginationLeft = "0",
  paginationBottom = "0",
  paginationClassName = "",
  Headingpadding,
  imagePadding,
  paddingBottom,
  minHeight,
  Bgcolor,
}: SliderSectionProps): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the slide container
    const slideContainer = containerRef.current?.querySelector(
      displayType === "card"
        ? ".swiper-slide > .amplify-view"
        : ".swiper-slide > .amplify-view"
    );

    // Create style element
    const styleEl = document.createElement("style");
    const uniqueClass = `custom-pagination-${Math.random().toString(36).substr(2, 9)}`;

    // Set CSS with dynamic width
    styleEl.innerHTML = `
      .${uniqueClass} {
        ${paginationBottom !== "0" ? `bottom: ${paginationBottom} !important;` : ""}
        ${paginationLeft !== "0" ? `left: ${paginationLeft} !important;` : ""}
        position: relative !important;
        max-width: ${displayType === "card" ? "90%" : "auto"} !important;
        margin: 0 auto !important;
      }
    `;

    document.head.appendChild(styleEl);

    // Apply class to pagination
    const paginationEl = document.querySelector(".custom-pagination");
    if (paginationEl) {
      paginationEl.classList.add(uniqueClass);
    }

    return () => {
      document.head.removeChild(styleEl);
    };
  }, [displayType, paginationBottom, paginationLeft]);

  // Add state to track mobile view
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile view with a resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1250);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pagination configuration
  const paginationRef = React.useRef(null);
  const pagination = {
    clickable: true,
    el: paginationRef.current,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };

  // Function to get appropriate logos based on viewport
  const getLogos = (item) => {
    if (!item) return [];

    // If custom styles are provided, use minimal spacing
    const hasCustomStyles = customStyles.padding;

    if (isMobile && item.mobileLogos) {
      return item.mobileLogos || [];
    } else if (!isMobile && item.desktopLogos) {
      return item.desktopLogos || [];
    } else {
      return item.logos || [];
    }
  };

  const isLoopEnabled = typeof window !== "undefined" ? window.innerWidth >= 1280 : false;
  return (
    <View
      padding={{
        base: customStyles.padding?.base || "2.8125rem 0 1.875rem",
        xl:
          customStyles.padding?.xl ||
          (displayType === "card"
            ? "3.375rem 2rem 8.125rem"
            : "3.375rem 0 8.125rem"),
      }}
      maxWidth={{
        base: customStyles.maxWidth?.base || "100%",
        xl: customStyles.maxWidth?.xl || "100%",
      }}
      margin={{
        base: customStyles.margin?.base || "0 auto",
        xl: customStyles.margin?.xl || "0 auto",
      }}
      backgroundColor={
        theme === SliderSectionTheme.Dark ? "#373948" : `${theme}`
      }
      className={`slider-section ${displayType === "card" ? " card-style" : ""} ${className ? ` ${className}` : ""}`}
    >
      <Flex
        direction={"column"}
        gap={{ base: "3.4375rem" }}
        width={"100%"}
        maxWidth={{ base: "100%", xl: "100%" }}
        margin={"0 auto"}
        position={"relative"}
      >
        {/* Only show title and description if they exist and for standard design */}
        {displayType === "standard" && title && (
          <Flex
            textAlign={{ base: "start", xl: "center" }}
            gap={{ base: "50px", xl: "33px" }}
            direction={{
              base: "column",
            }}
            padding={{ base: "0 .9375rem" }}
          >
            <Heading
              level={headingAs}
              width={{ base: "100%", xl: "45%" }}
              fontSize={{ base: customFontHeading || "44px", xl: "56px" }}
              marginBottom={{
                base: "0",
              }}
              fontWeight={400}
              fontFamily="var(--font-ToyotaType-Regular)"
              lineHeight={{ base: "140%", xl: "100%" }}
              fontStyle={"normal"}
              style={{ verticalAlign: "middle" }}
              color={theme === SliderSectionTheme.Dark ? "#ffffff" : `${color}`}
              margin={{
                base: "0 auto",
                medium: "0 auto",
                large: "0 auto",
                xl: "0 auto initial",
              }}
            >
              {title}
            </Heading>
            {description && (
              <Heading
                fontSize={{ base: "22px", xl: "18px" }}
                lineHeight={{ base: "130%", xl: "110.00000000000001%" }}
                letterSpacing={{ xl: "-2%" }}
                level={subtitleAs}
                maxWidth={{ base: "100%", xl: "100%" }}
                margin={"0 auto"}
                fontWeight={400}
                width={{ xl: "910px" }}
                fontFamily="var(--font-ToyotaType-Regular)"
                color={
                  theme === SliderSectionTheme.Dark ? "#ffffff" : "#000000"
                }
                style={{ verticalAlign: "center" }}
              >
                {description}
              </Heading>
            )}
          </Flex>
        )}

        <Swiper
          style={{ maxWidth: "100%" }}
          pagination={showPagination ? pagination : false}
          navigation={{
            nextEl: ".slider-section-next",
            prevEl: ".slider-section-prev",
            enabled: true,
            disabledClass: "swiper-button-disabled",
            lockClass: "swiper-button-lock",
          }}
          modules={[Pagination, Navigation, Autoplay, EffectFade]}
          slidesPerView={1}
          spaceBetween={0}
          loop={isLoopEnabled}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          centeredSlides={true}
          cssMode={false}
          speed={800}
          effect={displayType === "card" ? "fade" : "slide"}
          fadeEffect={
            displayType === "card"
              ? {
                crossFade: true,
              }
              : undefined
          }
          watchOverflow={true}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          onSwiper={(swiper) => {
            // Force update after a brief delay to ensure proper rendering
            setTimeout(() => {
              if (swiper.destroyed) return;
              swiper.update();
              swiper.updateSlides();
              swiper.updateProgress();
              swiper.updateSlidesClasses();

              // Make sure navigation elements are initialized
              if (swiper.navigation) {
                swiper.navigation.init();
                swiper.navigation.update();
              }

              // Reset any transform that might be causing alignment issues
              if (displayType === "card") {
                const slides = document.querySelectorAll(
                  ".slider-section.card-style .swiper-slide"
                );
                slides.forEach((slide) => {
                  (slide as HTMLElement).style.transform = "none";
                });
              }
            }, 200);
          }}
          className={displayType === "card" ? "card-swiper" : ""}
        >
          {/* Explicitly map over each item */}
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <SwiperSlide key={`slide-${index}-${item.title}`}>
                {displayType === "card" ? (
                  // Card style design
                  <View
                    backgroundColor={SliderBgColor ? { base: SliderBgColor, md: SliderBgColor, lg: SliderBgColor } : { base: "transparent", md: "transparent", xl: "#000" }}
                    border={{ base: "6px solid", md: "6px solid", xl: "none" }}
                    padding={{
                      base: "0",
                      xl: "0",
                    }}
                    borderRadius="4px"
                    overflow="hidden"
                    height={{ base: "auto", xl: "auto" }}
                    minHeight={{ base: "600px", xl: "600px" }}
                    width={{ base: "100%", xl: "90%" }}
                    margin={{ base: "0", xl: "0 auto" }}
                  >
                    <View
                      backgroundColor="#FFFFFF"
                      margin="10px auto"
                      padding="30px"
                      height="calc(100% - 20px)"
                      width="calc(100% - 20px)"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Heading
                        level={3}
                        fontSize="26px"
                        fontWeight="700"
                        marginBottom="20px"
                        fontFamily="var(--font-toyotaText)"
                      >
                        {item.title || `Title ${index}`}
                      </Heading>

                      <Text
                        fontSize="16px"
                        marginBottom="20px"
                        fontWeight={400}
                        fontFamily="var(--font-toyotaType-Regular)"
                      >
                        {item.description || "No description"}
                      </Text>


                      {/* Responsive Logos - get appropriate logos based on viewport */}
                      {getLogos(item)?.length > 0 && (
                        <Flex
                          direction="row"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: isMobile
                              ? "center"
                              : "space-between",
                            gap: "15px",
                            marginTop: "auto",
                            marginBottom: "20px",
                          }}
                        >
                          {getLogos(item).map((logo, i) => (
                            <Image
                              key={`logo-${i}`}
                              src={logo.src}
                              alt={logo.alt}
                              height={
                                logo.height || (isMobile ? "60px" : "80px")
                              }
                              width={logo.width || "auto"}
                              objectFit={logo.objectFit || "contain"}
                              style={{
                                maxWidth: isMobile
                                  ? "100%"
                                  : "calc(33.333% - 10px)",
                                flexBasis: isMobile
                                  ? "100%"
                                  : "calc(33.333% - 10px)",
                              }}
                            />
                          ))}
                        </Flex>
                      )}
                    </View>
                  </View>
                ) : (
                  // Standard style (original design) with modifications
                  <View
                    className="slider-inner"
                    height={{ base: "100%", xl: "auto" }}
                    backgroundColor={SliderBgColor || "#000"}
                    padding={{
                      base: "1.875rem  2.18rem 63px  2.18rem",
                      xl:
                        theme === SliderSectionTheme.Dark
                          ? ""
                          : "63px 0px 63px",
                    }}
                    maxWidth={{
                      xl: "min(76.25rem, 80%)",
                      xll: "1220px",
                    }}
                    minWidth={{
                      xl: "min(76.25rem, 80%)",
                      xll: "1220px",
                    }}
                    margin={"auto"}
                    position={"relative"}
                    minHeight={
                      minHeight || {
                        base: "330px",
                        medium: "330px",
                        xl: "100%",
                      }
                    }
                    maxHeight={{ medium: "640px", large: "640px", xl: "640px" }}
                    marginBottom={{
                      xl: paddingBottom ? paddingBottom : "30px",
                    }}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        height: "100%",
                        marginTop: customStyles.margin ? "120px" : "0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                        }}
                      >
                        <Flex
                          width={"100%"}
                          flex={"0 0 100%"}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid
                            templateColumns={{ xl: "auto 1fr" }}
                            backgroundColor={"#ffffff"}
                            width={"100%"}
                            flex={"0 0 100%"}
                            margin={"0"}
                            style={{
                              minHeight: "440px",
                            }}
                            maxWidth={
                              theme === SliderSectionTheme.Dark
                                ? "auto"
                                : item.image.src
                                  ? "911px"
                                  : "100%"
                            }
                            gap={"0"}
                          >
                            {item.image && item.image.src && (
                              <Flex
                                alignItems={"center"}
                                position="relative"
                                height={{
                                  base: "191px",
                                  xl: "100%",
                                }}
                                style={{
                                  width: "100%",
                                  overflow: "hidden",
                                }}
                                maxWidth={{ xl: "100%" }}
                                overflow={"hidden"}
                              >
                                <Image
                                  padding={imagePadding ? imagePadding : ""}
                                  src={item.image.src}
                                  alt={item.image.alt}
                                  width="100%"
                                  objectFit={{
                                    base: item.image.objectFit || "cover",
                                    medium: item.image.objectFit || "cover",
                                    xl: item.image.objectFit || "cover",
                                    xxl: item.image.objectFit || "cover",
                                  }}
                                  style={{
                                    objectPosition: "center",
                                  }}
                                  minWidth={{
                                    base: "",
                                    medium: "",
                                    xl: "440px",
                                    xl: "495px",
                                  }}
                                  minHeight={{
                                    base: "250px",
                                    medium: "",
                                    xl: "440px",
                                    xxl: "495px",
                                  }}
                                  maxHeight={{
                                    base: "250px",
                                    medium: "318px",
                                    large: "420px",
                                    xl: "478px",
                                    xxl: "495px",
                                  }}
                                />
                                {showImageReference && (
                                  <Text
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    position="absolute"
                                    bottom="10px"
                                    left={{ base: "25%", xl: "35%" }}
                                    padding="2px 8px"
                                    borderRadius="4px"
                                    zIndex="10"
                                  >
                                    *Imágenes de referencia
                                  </Text>
                                )}
                              </Flex>
                            )}
                            <Flex
                              direction={"column"}
                              justifyContent={{
                                base: "center",
                                xl: item.image.src ? "start" : "center",
                              }}
                              alignItems={"center"}
                              gap={"0"}
                              padding={{ base: "30px 12px", xl: "0 30px" }}
                              width={"100%"}
                            >
                              <View
                                maxWidth={{
                                  base: "100%",
                                  xl: "82%",
                                }}
                                className="view-container-tgr-text"
                                display={{
                                  base: "",
                                  medium: "flex",
                                  large: "flex",
                                  xl: "",
                                }}
                                justifyContent={{
                                  base: "",
                                  medium: "center",
                                  large: "center",
                                  xl: "",
                                }}
                                alignItems={{
                                  base: "",
                                  medium: "center",
                                  large: "center",
                                  xl: "",
                                }}
                              // flexDirection={{
                              //   base: "",
                              //   medium: "column",
                              //   large: "column",
                              //   xl: "",
                              // }}
                              >
                                {/* Check if title is a number to determine rendering style */}
                                {!isNaN(Number(item.title)) ? (
                                  // <Flex
                                  //   alignItems="center"
                                  //   marginBottom="1.5rem"
                                  // >
                                  //   {/* Red circular background for title number */}
                                  //   <View
                                  //     width="50px"
                                  //     height="50px"
                                  //     backgroundColor="#D83639"
                                  //     borderRadius="50%"
                                  //     display="flex"
                                  //     justifyContent="center"
                                  //     alignItems="center"
                                  //     marginRight="15px"
                                  //     marginRight="50px"
                                  //   >
                                  //     <Text
                                  //       fontSize="22px"
                                  //       fontWeight="700"
                                  //       color="#FFFFFF"
                                  //       textAlign="center"
                                  //     >
                                  //       {item.title}
                                  //     </Text>
                                  //   </View>
                                  // </Flex>

                                  <Heading
                                    level={4}
                                    fontSize={{ base: "22px", xl: "22px" }}
                                    fontStyle={"normal"}
                                    fontWeight={"700"}
                                    marginBottom={{
                                      base: ".9375rem",
                                      xl: "1.5rem",
                                    }}
                                    lineHeight={{ base: "24px", xl: "28px" }}
                                    textAlign={"start"}
                                    fontFamily="var(--font-ToyotaType-Regular)"
                                    color={"#000"}
                                    marginTop={{ xl: "100px", xll: "100px" }}
                                  >
                                    {item.title}
                                  </Heading>
                                ) : (
                                  <Heading
                                    level={4}
                                    fontSize={{ base: "22px", xl: "22px" }}
                                    fontStyle={"normal"}
                                    fontWeight={"700"}
                                    marginBottom={{
                                      base: ".9375rem",
                                      xl: "1.5rem",
                                    }}
                                    lineHeight={{ base: "24px", xl: "28px" }}
                                    textAlign={{ xl: textAlignment }}
                                    fontFamily="var(--font-ToyotaType-Regular)"
                                    color={"#000"}
                                    marginTop={{ xl: "100px", xll: "100px" }}
                                  >
                                    {item.title}
                                  </Heading>
                                )}
                                <Text
                                  fontSize={{ base: "12px", xl: "18px" }}
                                  lineHeight={"normal"}
                                  marginBottom={{
                                    base: "1.5625rem",
                                    xl: "3.125rem",
                                  }}
                                  fontWeight={400}
                                  fontFamily="var(--font-ToyotaType-Regular)"
                                  width={{
                                    base: "",
                                    medium: "50%",
                                    large: "50%",
                                    xl: item.image.src ? "100%" : "100%",
                                  }}
                                  textAlign={{ xl: textAlignment }}
                                >
                                  {item.description}
                                </Text>

                                {/* Secondary description if available */}
                                {/* {item.secondaryDescription && (
                                  <Text
                                    fontSize={{ base: "12px", xl: "18px" }}
                                    lineHeight={"normal"}
                                    fontWeight={400}
                                    fontFamily="var(--font-ToyotaType-Regular)"
                                    textAlign={{ xl: textAlignment }}
                                  >
                                    {item.secondaryDescription}
                                  </Text>
                                )} */}

                                {/* Responsive Logos for standard layout */}
                                {getLogos(item)?.length > 0 && (
                                  <Flex
                                    direction="row"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      justifyContent: isMobile
                                        ? "center"
                                        : "flex-start",
                                      gap: "10px",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    {getLogos(item).map((logo, i) => (
                                      <Image
                                        key={`logo-${i}`}
                                        src={logo.src}
                                        alt={logo.alt}
                                        height={
                                          logo.height ||
                                          (isMobile ? "40px" : "60px")
                                        }
                                        width={logo.width || "auto"}
                                        objectFit={logo.objectFit || "contain"}
                                        style={{
                                          maxWidth: isMobile ? "100%" : "auto",
                                        }}
                                      />
                                    ))}
                                  </Flex>
                                )}
                              </View>
                            </Flex>
                          </Grid>
                        </Flex>
                      </div>
                    </div>
                  </View>
                )}
              </SwiperSlide>
            ))}

          <AmplifyButton
            className="slider-section-prev arrowCustom arrowCustom--prev"
            aria-label="Previous slide"
            style={{ border: "none" }}
          ></AmplifyButton>
          <AmplifyButton
            className="slider-section-next arrowCustom arrowCustom--next"
            aria-label="Next slide"
            style={{ border: "none" }}
          ></AmplifyButton>

          <div
            ref={paginationRef}
            className={`custom-pagination ${paginationClassName}`}
          ></div>
        </Swiper>
      </Flex>
    </View>
  );
}
