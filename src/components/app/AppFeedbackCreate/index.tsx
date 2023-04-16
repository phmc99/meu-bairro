import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from 'react';
import { ICommerce } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { createFeedback } from '../../../services/feedback';
import { useRouter } from 'next/router';
import { actionErrors, userDataErrors } from './helpers';
import { getUserData } from '../../../store/app/user';
import { useQueryClient } from 'react-query';

interface AppFeedbackCreateProps {
  commerce: ICommerce;
  onClose: any;
}

const AppFeedbackCreate = ({ commerce, onClose }: AppFeedbackCreateProps) => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<string>('');
  const [rate, setRate] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: AppState) => state.user);

  const ratingChanged = (newRating: any) => {
    setRate(newRating);
  };

  const handleChangeComment = (e: any) => {
    const { value } = e.target;
    setComment(value);
    setCharCount(value.length);
  };

  const handleSendFeedback = async () => {
    setLoading(true);

    if (comment.trim() === '') {
      toast({
        status: 'error',
        title: 'Insira um comentário',
        isClosable: true,
        duration: 3000
      });

      return setLoading(false);
    }

    const token = localStorage.getItem('@mb:user-token') || '';
    const { _id } = commerce;
    const body = {
      user: {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName
      },
      comment,
      rate
    };

    const create = await createFeedback(_id, token, body);

    if (create.message && userDataErrors.includes(create.message)) {
      toast({
        status: 'error',
        title: 'Algo de errado com seus dados',
        isClosable: true,
        duration: 3000
      });
      router.push('/app/user');
    }

    if (create.message && actionErrors.includes(create.message)) {
      toast({
        status: 'warning',
        title: create.message,
        isClosable: true,
        duration: 3000
      });
    }

    if (create.createdAt) {
      toast({
        status: 'success',
        title: 'Avaliação enviada',
        isClosable: true,
        duration: 3000
      });
    }

    setLoading(false);
    onClose();
    queryClient.invalidateQueries(['commerce']);
    return;
  };

  useEffect(() => {
    const token = localStorage.getItem('@mb:user-token') || '';

    if (!user && token.trim() !== '') {
      dispatch(getUserData(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Avalie esse comércio</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl my={2}>
            <Flex alignItems="center" justifyContent="space-between">
              <FormLabel>Comentário</FormLabel>
              <Text fontSize="sm">{charCount}/200</Text>
            </Flex>
            <Textarea
              value={comment}
              onChange={handleChangeComment}
              placeholder="Digite um comentário sobre o comércio!"
              disabled={loading}
              maxLength={200}
            />
          </FormControl>
          <Flex
            pointerEvents={loading ? 'none' : 'all'}
            gap={2}
            textAlign="left"
            direction="column"
          >
            <Text fontWeight={500}>Nota</Text>
            <StarRatings
              rating={rate}
              starRatedColor="#ECC94B"
              starHoverColor="#ffda54"
              changeRating={ratingChanged}
              numberOfStars={5}
              name="rating"
              starDimension="24px"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSendFeedback}
            isLoading={loading}
            colorScheme="blue"
            mr={3}
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default AppFeedbackCreate;
