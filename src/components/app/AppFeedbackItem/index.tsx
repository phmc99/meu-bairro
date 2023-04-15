import { Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IFeedback } from '../../../types';
import { useEffect, useState } from 'react';
import { decodeToken } from '../../../utils/jwt';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '../../../services/feedback';

interface AppFeedbackItemProps {
  feedback: IFeedback;
  onClose: any;
}

const AppFeedbackItem = ({ feedback, onClose }: AppFeedbackItemProps) => {
  const [feedbackOwner, setFeedbackOwner] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const toast = useToast();

  const handleDeleteFeedback = async () => {
    if (token.trim() !== '') {
      await deleteFeedback(feedback._id, token);
      onClose();
      return toast({
        title: 'Avaliaçao deletada',
        duration: 3000,
        isClosable: true
      });
    } else {
      return toast({
        title: 'Erro ao deletar avaliação',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token') || '';

    if (token.trim() !== '') {
      setToken(token);
      const { decoded } = decodeToken(token);
      const { id } = decoded as { id: string };
      if (id === feedback.user._id) {
        setFeedbackOwner(true);
      } else {
        setFeedbackOwner(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex
      alignItems="center"
      gap={5}
      bgColor={feedbackOwner ? '#eaeaea' : '#f3f3f3'}
      border="1px"
      borderStyle="solid"
      borderColor={feedbackOwner ? '#8b8b8b' : 'transparent'}
      my={2}
      mx="auto"
      p={3}
      borderRadius={10}
      textAlign="left"
      onClick={() => 'test'}
    >
      <Flex w="100%" direction="column" gap={2}>
        <Text
          fontSize="sm"
          w={['85%', '95%']}
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical'
          }}
        >
          {feedback.comment}
        </Text>
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Flex direction="column" gap={2}>
            <Text fontWeight={600} fontSize="xs">
              {feedback.user.firstName} {feedback.user.lastName}
            </Text>
            {feedbackOwner ? (
              <Button
                mr={2}
                size="sm"
                variant="link"
                colorScheme="red"
                aria-label="delete feedback"
                rightIcon={<DeleteIcon />}
                onClick={handleDeleteFeedback}
              >
                Deletar
              </Button>
            ) : null}
          </Flex>

          <Flex
            alignItems="flex-end"
            fontSize={'sm'}
            direction="column"
            gap={2}
          >
            <Flex alignItems="center">
              <Icon color="yellow.400" as={FaStar} />
              <Text color="yellow.400" fontWeight={700}>
                {feedback.rate.toFixed(1)}
              </Text>
            </Flex>
            <Text color="gray.600">{feedback.createdAt}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppFeedbackItem;
