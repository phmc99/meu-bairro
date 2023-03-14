import { FormControl, FormLabel, Input } from '@chakra-ui/react';
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
  images = images.reduce((obj: any, item: any, index: any) => {
    obj[index] = item;
    return obj;
  }, {});
  const [logoValue, setLogoValue] = useState<string>(logo);
  const [imagesValues, setImagesValues] = useState<any>(images);

  const handleImageInputChange = (e: any) => {
    const value = e.target.value;
    const inputName = e.target.name;
    const copy: any = { ...imagesValues };

    copy[inputName] = value;

    setImagesValues(copy);
  };

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
        <FormLabel>Imagem 1:</FormLabel>
        <Input
          name="0"
          data-img="img"
          value={imagesValues['0']}
          onChange={handleImageInputChange}
          placeholder="Insira a URL da Imagem 1"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Imagem 2:</FormLabel>
        <Input
          name="1"
          data-img="img"
          value={imagesValues['1']}
          onChange={handleImageInputChange}
          placeholder="Insira a URL da Imagem 2"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Imagem 3:</FormLabel>
        <Input
          name="2"
          data-img="img"
          value={imagesValues['2']}
          onChange={handleImageInputChange}
          placeholder="Insira a URL da Imagem 3"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Imagem 4:</FormLabel>
        <Input
          name="3"
          data-img="img"
          value={imagesValues['3']}
          onChange={handleImageInputChange}
          placeholder="Insira a URL da Imagem 4"
        />
      </FormControl>
    </CommercePageFormBase>
  );
};

export default CommercePageImageForm;
