'use client';

import React, { useId, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import './Card.css';
import { Image, Button as AmplifyButton, View, Flex, Text } from '@aws-amplify/ui-react';
import { DropZone } from '@puckeditor/core';


export type CardSliderItem = {
  id: string;
  name?: string;
  img?: string;
  bgColor?: string;
  objectFit?: React.CSSProperties["objectFit"];
};

export type CardSliderBlockProps = {
  items?: CardSliderItem[];

  slidesPerViewMobile?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;

  cardWidth?: string;
  cardHeight?: string;
  cardPadding?: string;

  spaceBetween?: number;
  centeredSlides?: boolean;
  infinite?: boolean;

  imagePosition?: "left" | "right" | "top";
};

/* ============================= */
/*        COMPONENT              */
/* ============================= */

export default function CardSliderBlock({
  items = [],
  slidesPerViewMobile = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  cardWidth = "100%",
  cardHeight = "auto",
  cardPadding = "20px",
  spaceBetween = 30,
  centeredSlides = false,
  infinite = true,
  imagePosition = "left",
}: CardSliderBlockProps) {
  const sliderId = useId();
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const totalPages = items.length;

  /* Memoized layout class */
  const layoutClass = useMemo(() => {
    if (imagePosition === "right") return "row-reverse";
    if (imagePosition === "top") return "column";
    return "row";
  }, [imagePosition]);

  if (!items.length) return null;

  return (
    <>
      <Swiper
        loop={infinite}
        slidesPerView={slidesPerViewMobile}
        centeredSlides={centeredSlides}
        spaceBetween={spaceBetween}
        slidesOffsetAfter={0}
        breakpoints={{
          640: {
            slidesPerView: slidesPerViewMobile,
            spaceBetween: 16,
            centeredSlides: false,
          },
          768: {
            // Tablet landscape
            slidesPerView: slidesPerViewTablet,
            spaceBetween: 25,
            centeredSlides: false,
          },
          1024: {
            // Small desktop
            slidesPerView: slidesPerViewTablet,
            spaceBetween: 30,
            centeredSlides: false,
          },
          1250: {
            slidesPerView: slidesPerViewDesktop,
            // slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: false,
          },
        }}
        navigation={{
          nextEl: `.vehicles-tabs-next-${sliderId}`,
          prevEl: `.vehicles-tabs-prev-${sliderId}`,

        }}
        onSlideChange={(swiper: any) =>
          setCurrentSlide(swiper.realIndex + 1)
        }
        modules={[Navigation]}
      >
        {items.map((item: any, i: number) => (
          <SwiperSlide
            key={item.id}
            className="vehicles-slide"
            style={{
              width: "auto",
              flexShrink: 0,
            }}
          >
            <div
              className="vehicle-card"
              style={{
                background: item.bgColor || "#111",
                width: cardWidth,
                height: cardHeight,
              }}
            >
              <div
                className={`vehicle-card-inner ${layoutClass}`}
                style={{
                  padding: cardPadding,
                  height: "100%",
                }}
              >
                {/* Image */}
                <div className="vehicle-image">
                  <img src={item.img} alt={item.name} style={{
                    objectFit: item.objectFit ?? "contain",
                  }} />
                </div>

                {/* Content */}
                <div className="vehicle-content">
                  <DropZone zone={`items.${i}.content`} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 0 && (
        <View>
          <Flex
            justifyContent={{ base: "space-between", xl: "center" }}
            alignItems={"center"}
            width={"100%"}
            maxWidth={{ base: "21.625rem", xl: "max-content" }}
            gap={{ xl: "140px" }}
            margin={{ base: "2.5rem auto 0", xl: "62px auto 0" }}
          >
            <AmplifyButton
              className={`vehicles-tabs-prev-${sliderId} arrowCustom arrowCustom--prev`}
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
            >
              <Image
                src="/images/arrow-simple-prev.svg"
                alt="Arrow prev"
                width={"1.3125rem"}
                height={".8125rem"}
                display={"flex"}
              />
            </AmplifyButton>
            <Text
              fontWeight={400}
              fontSize={{ base: "18px", xl: "" }}
              lineHeight={{ base: "normal", xl: "" }}
              fontStyle={{ base: "normal", xl: "" }}
              margin="0 auto"
              fontFamily="var(--font-ToyotaType-Regular)"
            >
              {currentSlide} de {totalPages}
            </Text>
            <AmplifyButton
              className={`vehicles-tabs-next-${sliderId} arrowCustom arrowCustom--next`}
              color={"transparent"}
              padding={"0"}
              width={"3.4375rem"}
              height={"1.875rem"}
              display={"flex"}
            >
              <Image
                src="/images/arrow-simple-next.svg"
                alt="Arrow next"
                width={"1.3125rem"}
                height={".8125rem"}
              />
            </AmplifyButton>
          </Flex>
        </View>
      )}
    </>
  )
}
