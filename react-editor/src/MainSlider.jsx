import { useState, useEffect, useRef } from "react";
import { View, Flex, Image, Heading, Text, Button } from "@aws-amplify/ui-react";

const MainSlider = ({
    slides = [],
    showDots = true,
    showArrows = true,
    autoplayDelay = 3000,
    alignBottom = false,
}) => {
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const timerRef = useRef(null);

    const defaultSlides = [
        {
            imageMobile: "/placeholder-mobile.jpg",
            imageDesktop: "/placeholder-desktop.jpg",
            title: "Slide title",
            description: "Slide description",
        },
    ];

    const mergedSlides =
        slides && slides.length > 0 ? slides : defaultSlides;

    const total = mergedSlides.length;

    const goNext = () => {
        setCurrent((prev) => (prev + 1) % total);
    };

    const goPrev = () => {
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    const goTo = (index) => {
        setCurrent(index);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (!isPlaying) return;

        timerRef.current = setInterval(goNext, autoplayDelay);

        return () => clearInterval(timerRef.current);
    }, [isPlaying, autoplayDelay, total]);

    return (
        <View className="simple-slider" width="100%" position="relative">
            <div className="slider-wrapper">
                {mergedSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === current ? "active" : ""}`}
                        style={{
                            display: index === current ? "block" : "none",
                        }}
                    >
                        <a
                            href={slide.link || "#"}
                            style={{ cursor: slide.link ? "pointer" : "default" }}
                        >
                            <picture>
                                <source
                                    srcSet={slide.imageDesktop}
                                    media="(min-width: 1250px)"
                                />
                                <img
                                    src={slide.imageMobile}
                                    alt={slide.title}
                                    className="slide-image"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </picture>

                            <View
                                className="slide-overlay"
                                position="absolute"
                                bottom={alignBottom ? "2rem" : "auto"}
                                top={alignBottom ? "auto" : "2rem"}
                                left="0"
                                right="0"
                                textAlign="center"
                            >
                                <Heading color="#fff">{slide.title}</Heading>

                                <Text color="#fff" marginTop="1rem">
                                    {slide.description}
                                </Text>

                                {slide.showButton && (
                                    <Button
                                        marginTop="1rem"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(slide.buttonLink, "_self");
                                        }}
                                    >
                                        Descubre más
                                    </Button>
                                )}
                            </View>
                        </a>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && (
                <>
                    <button className="prev-btn" onClick={goPrev}>
                        ◀
                    </button>
                    <button className="next-btn" onClick={goNext}>
                        ▶
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && (
                <div className="dots">
                    {mergedSlides.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === current ? "active" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            )}

            {/* Play / Pause */}
            <Flex
                as="button"
                className="play-pause-btn"
                onClick={togglePlay}
                position="absolute"
                bottom="1rem"
                right="1rem"
            >
                <Image
                    src={isPlaying ? "/svgs/pause.svg" : "/svgs/play.svg"}
                    alt={isPlaying ? "Pause" : "Play"}
                    width="12px"
                />
            </Flex>
        </View>
    );
};

export default MainSlider;
