import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function ArticleCarousel() {

    const { movies } = useSelector(state => state.movies);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {!movies.data ? null :
            movies.data.slice(0 , 12).map(movie => {
                return (
                    <SwiperSlide>
                        <img src={movie.image} alt={movie.title} loading="lazy" />
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </>
  );
}
