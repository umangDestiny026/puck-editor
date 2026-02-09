"use client";

import { useState, useRef } from "react";
import { View, Flex, Image, Heading, Text, Button, Link } from "@aws-amplify/ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

/* ========== TYPES ========== */

export interface Slide {
    imageMobile: string;
    imageDesktop: string;
    title: string;
    description: string;
    link?: string;
    videoUrl?: string;
    showButton?: boolean;
    buttonLink?: string;
}

export interface SliderConfig {
    slidesPerView?: number;
    spaceBetween?: number;
    loop?: boolean;
    autoplay?: {
        delay?: number;
    };
    pagination?: {
        clickable?: boolean;
    };
    navigation?: boolean;
}

interface ContainerProps {
    height?: any;
    minHeight?: any;
    image?: any;
}

interface MainSliderProps {
    slides?: Slide[];
    sliderConfig?: SliderConfig;
    alignBottom?: boolean;
    isPlayicon?: boolean;
    showNavigationArrows?: boolean;
    containerProps?: ContainerProps | null;
}

const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^&?/]+)/);
    return match ? match[1] : "";
};

const MainSlider: React.FC<MainSliderProps> = ({
    slides = [],
    sliderConfig,
    alignBottom = false,
    isPlayicon = true,
    showNavigationArrows = false,
    containerProps = null,
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const swiperRef = useRef<SwiperType | null>(null);

    const defaultSlides: Slide[] = [
        {
            imageMobile: "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg",
            imageDesktop: "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg",
            title: "Welcome to Our Website",
            description: "Discover amazing features and services.",
        },
        {
            imageMobile: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
            imageDesktop: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
            title: "",
            description: "",
        },
    ];

    const defaultConfig: SliderConfig = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { clickable: true },
        navigation: true,
    };

    const mergedSlides = slides && slides.length > 0 ? slides : defaultSlides;

    const config: SliderConfig = {
        ...defaultConfig,
        ...sliderConfig,
        autoplay: {
            ...defaultConfig.autoplay,
            ...(sliderConfig?.autoplay || {}),
        },
        pagination: {
            ...defaultConfig.pagination,
            ...(sliderConfig?.pagination || {}),
        },
    };

    const togglePlayPause = () => {
        if (!swiperRef.current) return;

        if (isPlaying) {
            swiperRef.current.autoplay?.stop();
        } else {
            swiperRef.current.autoplay?.start();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <View
            className="custom-slider-container"
            width="100%"
            height={
                containerProps == null
                    ? { medium: "50vh", large: "50vh", xl: "39.375rem" }
                    : containerProps.height
            }
            minHeight={
                containerProps == null ? { xl: "630px" } : containerProps.minHeight
            }
            position="relative"
            overflow="hidden"
        >
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={config.spaceBetween}
                slidesPerView={config.slidesPerView}
                loop={config.loop}
                autoplay={config.autoplay}
                navigation={
                    showNavigationArrows
                        ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
                        : false
                }
                pagination={
                    config.pagination
                        ? {
                            el: ".custom-pagination-main",
                            clickable: config.pagination.clickable,
                            type: "bullets",
                        }
                        : false
                }
            >
                {mergedSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Link
                            href={slide.link ? slide.link.trim() : "#"}
                            target={
                                slide.link && slide.link.startsWith("http") ? "_blank" : "_self"
                            }
                            className="slide-content"
                            style={{ cursor: slide.link ? "pointer" : "default" }}
                        >
                            <div className="top-overlay" />
                            <div className="bottom-overlay" />

                            {slide.videoUrl ? (
                                slide.videoUrl.includes("youtube.com") ? (
                                    <iframe
                                        src={
                                            slide.videoUrl +
                                            "?autoplay=1&mute=1&loop=1&playlist=" +
                                            getYouTubeId(slide.videoUrl) +
                                            "&controls=0&modestbranding=1&showinfo=0&rel=0"
                                        }
                                        title={slide.title}
                                        className="slide-video responsive-iframe"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                    />
                                ) : (
                                    <video
                                        className="slide-video"
                                        src={slide.videoUrl}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                )
                            ) : (
                                <picture className="d-flex">
                                    <source
                                        srcSet={slide.imageDesktop}
                                        media="(min-width: 1250px)"
                                    />
                                    <img
                                        src={slide.imageMobile}
                                        alt={slide.title}
                                        className={
                                            (containerProps?.image !== null
                                                ? "low-slider-image"
                                                : "") + " slide-image"
                                        }
                                        style={
                                            containerProps?.image !== null
                                                ? containerProps?.image
                                                : {}
                                        }
                                    />
                                </picture>
                            )}

                            <View
                                className="slide-overlay"
                                bottom={{ xl: "2.875rem" }}
                                top={{
                                    base: "",
                                    xl: alignBottom ? "auto" : "0",
                                    xxl: alignBottom ? "auto" : "0",
                                }}
                            >
                                <Heading
                                    fontSize={{ base: "32px", medium: "36px", xl: "56px" }}
                                    fontWeight={400}
                                    textAlign="center"
                                    color="#FFF"
                                >
                                    {slide.title}
                                </Heading>

                                <div className="slide-container">
                                    <Text
                                        className="slide-description"
                                        color="#FFF"
                                        textAlign="center"
                                        fontSize={{ base: "18px" }}
                                        fontWeight={500}
                                        lineHeight="31.37px"
                                    >
                                        {slide.description}
                                    </Text>

                                    {slide.showButton && (
                                        <Button
                                            type="button"
                                            color="red"
                                            className="slide-button"
                                            minWidth={{ base: "175px" }}
                                            padding={{ base: "10px 24px" }}
                                            margin={{ xl: "50px 0 0" }}
                                            onClick={() =>
                                                window.open(slide.buttonLink, "_self")
                                            }
                                        >
                                            Descubre más
                                        </Button>
                                    )}
                                </div>
                            </View>
                        </Link>
                    </SwiperSlide>
                ))}

                <div className="custom-pagination custom-pagination-main" />
            </Swiper>

            {showNavigationArrows && (
                <>
                    <div className="swiper-button-prev custom-arrow" />
                    <div className="swiper-button-next custom-arrow" />
                </>
            )}

            {isPlayicon && (
                <Flex
                    as="button"
                    className="play-pause-btn"
                    onClick={togglePlayPause}
                    width="3.4375rem"
                    minHeight="1.875rem"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        src={isPlaying ? "/svgs/pause.svg" : "/svgs/play.svg"}
                        alt={isPlaying ? "Pause" : "Play"}
                        width="6px"
                        minHeight=".625rem"
                    />
                </Flex>
            )}
        </View>
    );
};

export default MainSlider;