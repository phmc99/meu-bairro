import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import CommercePageFormBase from '../base';

interface CommercePageImageFormProps {
  setToggle: () => void;
  logo: string;
  images: any;
}

const CommercePageImageForm = ({
  setToggle,
  logo,
  images
}: CommercePageImageFormProps) => {
  const [logoValue, setLogoValue] = useState<string>(logo);
  const [imagesValue, setImagesValue] = useState<string>(images.join(','));

  return (
    <CommercePageFormBase
      type="image"
      title="Editar Imagens"
      setToggle={setToggle}
    >
      <FormControl>
        <FormLabel>Logo: </FormLabel>
        <Input
          name="logo"
          value={logoValue}
          onChange={e => setLogoValue(e.target.value)}
          placeholder="Insira a URL da Logo"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Imagens:</FormLabel>
        <Text size="xs" color="gray.400">
          Coloque os links separados por vírgula
        </Text>
        <Textarea
          value={imagesValue}
          name="images"
          onChange={e => setImagesValue(e.target.value)}
          placeholder="Insira a URL da Imagem"
          resize="vertical"
          size="lg"
        />
      </FormControl>
    </CommercePageFormBase>
  );
};

export default CommercePageImageForm;
