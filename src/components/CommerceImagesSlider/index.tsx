import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CommerceImagesSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={5}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide>
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '300px',
            margin: '0 auto'
          }}
        >
          <Image
            alt="teste"
            fill
            priority
            sizes="auto"
            style={{
              objectFit: 'cover'
            }}
            src="https://picsum.photos/500"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '300px',
            margin: '0 auto'
          }}
        >
          <Image
            alt="teste"
            fill
            priority
            sizes="auto"
            style={{
              objectFit: 'cover'
            }}
            src="https://picsum.photos/500"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default CommerceImagesSlider;
