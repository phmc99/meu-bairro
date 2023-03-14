import { Flex, Image } from '@chakra-ui/react';
import { A11y, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface AppSwiperProps {
  type: 'home' | 'commerce';
  images?: string[];
  logo?: string;
}

const AppSwiper = ({ type, images, logo }: AppSwiperProps) => {
  const urls: string[] = [
    './swiper1.jpg',
    './swiper2.jpg',
    './swiper3.jpg',
    './swiper4.jpg'
  ];

  return (
    <Flex maxHeight="45vh" w="100%">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        centeredSlides={true}
        effect={'coverflow'}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
      >
        {type === 'home' &&
          urls.map(url => (
            <SwiperSlide key={url}>
              <Image
                width="100%"
                alt="Imagem do Swiper"
                loading="lazy"
                src={url}
              />
            </SwiperSlide>
          ))}

        {type === 'commerce' && (
          <SwiperSlide key={logo}>
            <Image
              width="100%"
              alt="Imagem do Swiper"
              loading="lazy"
              src={logo}
            />
          </SwiperSlide>
        )}

        {type === 'commerce'
          ? images?.map(url => (
              <SwiperSlide key={url}>
                <Image
                  width="100%"
                  alt="Imagem do Swiper"
                  loading="lazy"
                  src={url}
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </Flex>
  );
};

export default AppSwiper;
