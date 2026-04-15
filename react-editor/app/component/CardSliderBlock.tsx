import React, { useId, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import './Card.css';

import {
  Image,
  Button as AmplifyButton,
  View,
  Flex,
  Text,
} from '@aws-amplify/ui-react';

import { DropZone } from '@puckeditor/core';

/* ============================= */
/*            TYPES              */
/* ============================= */

export type CardSliderItem = {
  id: string;
  name?: string;
  img?: string | { url: string; sourceMode: string; _previewUrl?: string };
  bgColor?: string;
  objectFit?: React.CSSProperties['objectFit'];
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

  imagePosition?: 'left' | 'right' | 'top';
};

/* ============================= */
/*        COMPONENT              */
/* ============================= */

/**
 *
 * @param root0
 * @param root0.items
 * @param root0.slidesPerViewMobile
 * @param root0.slidesPerViewTablet
 * @param root0.slidesPerViewDesktop
 * @param root0.cardWidth
 * @param root0.cardHeight
 * @param root0.cardPadding
 * @param root0.spaceBetween
 * @param root0.centeredSlides
 * @param root0.infinite
 * @param root0.imagePosition
 */
export default function CardSliderBlock({
  items = [],
  slidesPerViewMobile = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  cardWidth = '100%',
  cardHeight = 'auto',
  cardPadding = '20px',
  spaceBetween = 30,
  centeredSlides = false,
  infinite = true,
  imagePosition = 'left',
}: CardSliderBlockProps) {
  const rawId = useId();
  const sliderId = rawId.replace(/:/g, '');
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const totalPages = items.length;

  /* Memoized layout class */
  const layoutClass = useMemo(() => {
    if (imagePosition === 'right') return 'row-reverse';
    if (imagePosition === 'top') return 'column';
    return 'row';
  }, [imagePosition]);

  if (!items.length) return null;

  return (
    <>
      <Swiper
        loop={infinite}
        slidesPerView={slidesPerViewMobile}
        centeredSlides={centeredSlides}
        spaceBetween={spaceBetween}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: slidesPerViewMobile,
            spaceBetween: 16,
            centeredSlides: false,
          },
          768: {
            slidesPerView: slidesPerViewTablet,
            spaceBetween: 25,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: slidesPerViewTablet,
            spaceBetween: 30,
            centeredSlides: false,
          },
          1250: {
            slidesPerView: slidesPerViewDesktop,
            spaceBetween: 40,
            centeredSlides: false,
          },
        }}
        navigation={{
          nextEl: `.vehicles-tabs-next-${sliderId}`,
          prevEl: `.vehicles-tabs-prev-${sliderId}`,
        }}
        onSlideChange={(swiper: SwiperType) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide
            key={item.id}
            className="vehicles-slide"
            style={{
              width: 'auto',
              flexShrink: 0,
            }}
          >
            <div
              className="vehicle-card"
              style={{
                background: item.bgColor ?? '#111',
                width: cardWidth,
                height: cardHeight,
              }}
            >
              <div
                className={`vehicle-card-inner ${layoutClass}`}
                style={{
                  padding: cardPadding,
                  height: '100%',
                }}
              >
                {/* Image */}
                {item.img && (
                  <div className="vehicle-image">
                    <img
                      src={
                        typeof item.img === 'string'
                          ? item.img
                          : item.img?._previewUrl || item.img?.url
                      }
                      alt={item.name ?? 'card-image'}
                      style={{
                        objectFit: item.objectFit ?? 'contain',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                )}

                {/* Puck Content */}
                <div className="vehicle-content">
                  <DropZone zone={`items.${i}.content`} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <View>
        <Flex
          justifyContent={{
            base: 'space-between',
            xl: 'center',
          }}
          alignItems="center"
          width="100%"
          maxWidth={{
            base: '21.625rem',
            xl: 'max-content',
          }}
          gap={{
            xl: '140px',
          }}
          margin={{
            base: '2.5rem auto 0',
            xl: '62px auto 0',
          }}
        >
          <AmplifyButton
            className={`vehicles-tabs-prev-${sliderId} arrowCustom arrowCustom--prev`}
            variation="link"
            padding="0"
            width="3.4375rem"
            height="1.875rem"
          >
            <Image
              src="/images/arrow-simple-prev.svg"
              alt="Arrow prev"
              width="1.3125rem"
              height=".8125rem"
            />
          </AmplifyButton>

          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
            }}
            margin="0 auto"
            fontFamily="var(--font-ToyotaType-Regular)"
          >
            {currentSlide} de {totalPages}
          </Text>

          <AmplifyButton
            className={`vehicles-tabs-next-${sliderId} arrowCustom arrowCustom--next`}
            variation="link"
            padding="0"
            width="3.4375rem"
            height="1.875rem"
          >
            <Image
              src="/images/arrow-simple-next.svg"
              alt="Arrow next"
              width="1.3125rem"
              height=".8125rem"
            />
          </AmplifyButton>
        </Flex>
      </View>
    </>
  );
}
