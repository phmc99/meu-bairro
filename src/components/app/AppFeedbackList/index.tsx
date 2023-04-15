import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { IFeedback } from '../../../types';
import AppFeedbackItem from '../AppFeedbackItem';
import { scrolllBarCategoryList } from '../AppCategoryList/style';
import { useEffect, useState } from 'react';
import { decodeToken } from '../../../utils/jwt';

interface AppFeedbackListProps {
  feedbacks: IFeedback[];
  onClose: any;
}

const AppFeedbackList = ({ feedbacks, onClose }: AppFeedbackListProps) => {
  const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);

  const feedbackOrder = (userId?: string) => {
    if (userId) {
      const userFeedback = feedbacks.find(item => item.user._id === userId);

      if (!userFeedback) {
        return setFeedbackList(feedbacks);
      }

      const feedbackIndex = feedbacks.findIndex(
        item => item._id === userFeedback?._id
      );

      const feedbacksCopy = [...feedbacks];
      feedbacksCopy.splice(feedbackIndex, 1);

      setFeedbackList([userFeedback, ...feedbacksCopy]);
      return;
    }

    return;
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token') || '';

    if (token.trim() !== '') {
      const { decoded } = decodeToken(token);
      const { id } = decoded as { id: string };
      feedbackOrder(id);
    } else {
      setFeedbackList(feedbacks);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Todas as avaliações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h="50vh" overflowY="scroll" sx={scrolllBarCategoryList}>
            {feedbackList.length > 0
              ? feedbackList.map(item => (
                  <AppFeedbackItem
                    feedback={item}
                    key={item._id}
                    onClose={onClose}
                  />
                ))
              : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AppFeedbackList;
