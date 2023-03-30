import {
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast
} from '@chakra-ui/react';
import {
  createBanner,
  deleteBanner,
  getBanners
} from '../../../services/banner';
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
  const [newBanner, setNewBanner] = useState<string | undefined>();

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

  const handleAddBanner = async () => {
    setLoading(true);

    if (!newBanner || newBanner.trim() === '') {
      return toast({
        title: 'Insira uma url válida',
        duration: 2000,
        isClosable: true,
        status: 'error',
        position: 'bottom'
      });
    }

    const response = await createBanner(token, newBanner);

    if (response.status === 'Error') {
      setNewBanner('');
      setLoading(false);
      return toast({
        title: 'O limite de banners é 8',
        duration: 2000,
        isClosable: true,
        status: 'error',
        position: 'bottom'
      });
    }

    setData([...data, response]);
    setNewBanner('');
    setLoading(false);

    return toast({
      title: 'Banner deletado',
      duration: 2000,
      isClosable: true,
      status: 'success',
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
          <Flex mt={10} mb={5} gap={2} alignItems="center">
            <Input
              placeholder="Digite a URL da imagem"
              value={newBanner}
              onChange={e => setNewBanner(e.target.value)}
            />
            <Button
              onClick={handleAddBanner}
              colorScheme="teal"
              fontSize={['sm', 'md']}
            >
              Adicionar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default BannersModal;
