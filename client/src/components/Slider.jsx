import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { SliderCard } from "../components/index";

// Import Swiper styles
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";

const Slider = () => {
  //get data
  const products = useSelector((state) => state.products);
  const [fruits, setfruits] = useState(null);
  useEffect(() => {
    setfruits(products?.filter((data) => data.product_Category === "fruits"));
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i}></SliderCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
