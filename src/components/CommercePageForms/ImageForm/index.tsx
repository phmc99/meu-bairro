import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import CommercePageFormBase from '../base';

interface CommercePageImageFormProps {
  setToggle: () => void;
  logo: string;
  images: any;
}

const CommercePageImageForm = ({
  setToggle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logo,
  images
}: CommercePageImageFormProps) => {
  const [newInput, setNewInput] = useState<any[]>([]);

  const handleAddInput = () => {
    setNewInput([
      ...newInput,
      <FormControl key={images.length + newInput.length}>
        <FormLabel>Imagem Nova {newInput.length + 1}:</FormLabel>
        <Input placeholder="Insira a URL da Imagem" />
      </FormControl>
    ]);
  };
  return (
    <CommercePageFormBase
      type="image"
      title="Editar Imagens"
      setToggle={setToggle}
    >
      <FormControl>
        <FormLabel>Logo: </FormLabel>
        <Input name="logo" placeholder="Insira a URL da Logo" />
      </FormControl>

      {images.length > 0
        ? Array(images).map((item, index) => (
            <FormControl key={index}>
              <FormLabel>Imagem {index + 1}:</FormLabel>
              <Input placeholder="Insira a URL da Imagem" />
            </FormControl>
          ))
        : null}
      {newInput}
      <Button onClick={handleAddInput} mt={5} variant="link">
        Adicionar URL de Imagem
      </Button>
    </CommercePageFormBase>
  );
};

export default CommercePageImageForm;
