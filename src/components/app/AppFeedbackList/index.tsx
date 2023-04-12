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

interface AppFeedbackListProps {
  feedbacks: IFeedback[];
}

const AppFeedbackList = ({ feedbacks }: AppFeedbackListProps) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent w="95%">
        <ModalHeader>Todas as avaliações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h="50vh" overflowY="scroll" sx={scrolllBarCategoryList}>
            {feedbacks.length > 0
              ? feedbacks.map(item => (
                  <AppFeedbackItem feedback={item} key={item._id} />
                ))
              : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AppFeedbackList;
