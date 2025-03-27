// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
// import { createGlobalStyle } from "styled-components";

// const images = Array.from({ length: 5 }, (_, i) => 
//   `https://picsum.photos/800/500?random=${i + 1}`
// );

// const GlobalStyles = createGlobalStyle`
//   .swiper-pagination-bullet {
//     background-color: #ff5733 !important;
//     width: 10px;
//     height: 10px;
//     opacity: 0.5;
//     transition: opacity 0.3s ease;
//   }

//   .swiper-pagination-bullet-active {
//     background-color: #ff0000 !important;
//     opacity: 1;
//   }
// `;


// const ImageSwiper = () => {
//   return (
//     <>
//       <GlobalStyles />

//       <Swiper
//         modules={[EffectCoverflow, Autoplay, Pagination]}
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={10} // Show 3 slides at a time
//         loop={true}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         coverflowEffect={{
//           rotate: 20, // Slight rotation for depth effect
//           stretch: 0,
//           depth: 200, // Adds a nice depth effect
//           modifier: 1,
//           slideShadows: true,
//         }}
//         pagination={{ clickable: true }}
//         style={{ width: "100%", maxWidth: "100%", height: "500px" }}
//       >
//         {images.map((src, index) => (
//           <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
//             <img
//               src={src}
//               alt={`Random ${index + 1}`}
//               style={{
//                 width: "100vw",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "15px",
//                 boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
//               }}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// };

// export default ImageSwiper;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(window.innerWidth < 768 ? 'Mobile' : 'Desktop');

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 768 ? 'Mobile' : 'Desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

// const images = Array.from({ length: 5 }, (_, i) => 
//   `https://picsum.photos/800/500?random=${i + 1}`
// );

const images = [
  "../assets/images/result-1.jpg",
  "../assets/images/result-2.jpg",
  "../assets/images/result-3.jpg",
  "../assets/images/result-4.jpg",
  "../assets/images/result-5.jpg",


];

const ImageSwiper = () => {
  const deviceType = useDeviceType();

  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay, Pagination]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      // slidesPerView="auto"
      slidesPerView={deviceType == "Mobile" ? 1 : 2}
      loop={true}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      style={{ width: "100%", maxWidth: "1400px", height: "600px" }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={src}
            alt={`Random ${index + 1}`}
            style={{
              width: deviceType == "Mobile" ? "90%" : "1200px",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
