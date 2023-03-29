import {
  Box,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { deleteBanner, getBanners } from '../../../services/banner';
import { IBanner } from '../../../types';
import AppSwiper from '../../app/AppSwiper';
import BannersModalInput from '../BannersModalInput';
import { useEffect, useState } from 'react';

interface BannersModalProps {
  token: string;
}

const BannersModal = ({ token }: BannersModalProps) => {
  const [data, setData] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async function getData() {
      setLoading(true);
      const { banners } = await getBanners();
      setData(banners);
      setLoading(false);
    })();
  }, []);

  const handleDeleteBanner = async (id: string) => {
    setLoading(true);
    await deleteBanner(token, id);
    setData(data.filter(item => item._id !== id));
    setLoading(false);
    return toast({
      title: 'Banner deletado',
      duration: 2000,
      isClosable: true,
      status: 'error',
      position: 'bottom'
    });
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Banners Homepage</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Flex w="100%" h={350} alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          ) : (
            <AppSwiper type="home" images={data.map(item => item.imgUrl)} />
          )}

          <Box my={5}>
            <form>
              {data.map(({ imgUrl, _id }) => (
                <BannersModalInput
                  key={_id}
                  imgUrl={imgUrl}
                  deleteBanner={() => handleDeleteBanner(_id)}
                  loading={loading}
                />
              ))}
            </form>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={loading} colorScheme="teal">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default BannersModal;
