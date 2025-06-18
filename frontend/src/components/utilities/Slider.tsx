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
        spaceBetween={48}
        direction="horizontal"
        slidesPerView={3}
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
            <SwiperSlide key={index} className="slider-item">
              <img src={slide} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="custom-pagination"></div>
    </div>
  ) : (
    //TODO: implement this
    <>NO SLIDES PASSED</>
  );
}
