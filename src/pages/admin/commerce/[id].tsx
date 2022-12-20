import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CommerceImagesSlider from '../../../components/CommerceImagesSlider';

const CommercePage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>CommercePage {router.query.id}</h1>
      <Box width={'80%'} margin="0 auto">
        <CommerceImagesSlider />
      </Box>
    </div>
  );
};

export default CommercePage;
