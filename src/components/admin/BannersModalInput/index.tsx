import { Flex, IconButton, Input } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

interface BannersModalInputProps {
  imgUrl: string;
  value?: string;
  deleteBanner: () => any;
  loading: boolean;
}

const BannersModalInput = ({
  imgUrl,
  deleteBanner,
  loading
}: BannersModalInputProps) => {
  return (
    <Flex gap={2} my={4}>
      <Input disabled value={imgUrl} placeholder={'URL da imagem'} />
      <IconButton
        colorScheme="red"
        aria-label="Delete banner"
        icon={<FaTrash />}
        onClick={deleteBanner}
        isLoading={loading}
      />
    </Flex>
  );
};

export default BannersModalInput;
