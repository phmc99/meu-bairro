import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Heading, Img } from '@chakra-ui/react';

interface CommerceImageSliceProps {
  logo: string;
  images: string[];
}

const CommerceImagesSlider = ({ logo, images }: CommerceImageSliceProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
      effect={'coverflow'}
      grabCursor={true}
    >
      {logo.trim() === '' ? (
        <Heading size="md" color="gray.500">
          Sem logo
        </Heading>
      ) : (
        <SwiperSlide>
          <Img m={'0 auto'} alt="Logotipo" src={logo} />
        </SwiperSlide>
      )}

      {images &&
        images.length > 0 &&
        images.map((item, index) => (
          <SwiperSlide key={index}>
            <Img m={'0 auto'} alt="Imagem do comércio" src={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CommerceImagesSlider;
