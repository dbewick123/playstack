//External Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "./slider.css";

interface SliderProps {
  slides: string[];
}

export function Slider({ slides }: SliderProps) {
  return Array.isArray(slides) ? (
    <div className="slider-wrapper">
      <Swiper
        direction="horizontal"
        breakpoints={{
          // when window width is >= 320px
          0: {
            slidesPerView: 'auto',
            spaceBetween: '2.631%'
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 'auto',
            spaceBetween: '2.631%'
          },

        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination]}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={slide} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="custom-pagination"></div>
    </div>
  ) : (
    null
  );
}
