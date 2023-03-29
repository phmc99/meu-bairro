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
    'https://picsum.photos/id/1/600',
    'https://picsum.photos/id/2/600',
    'https://picsum.photos/id/3/600',
    'https://picsum.photos/id/4/600'
  ];

  if (images) {
    images = images.length > 0 ? images : urls;
  }

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
          images?.map(url => (
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
              src={logo || 'https://picsum.photos/2560'}
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
