import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IFeedback } from '../../../types';

interface AppFeedbackItemProps {
  feedback: IFeedback;
}

const AppFeedbackItem = ({ feedback }: AppFeedbackItemProps) => {
  return (
    <Flex
      alignItems="center"
      gap={5}
      bgColor="#f3f3f3"
      my={2}
      mx="auto"
      p={3}
      borderRadius={10}
      textAlign="left"
      onClick={() => 'test'}
    >
      <Flex direction="column" gap={2}>
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
        <Flex justifyContent="space-between">
          <Text fontWeight={600} fontSize="xs">
            {feedback.user.firstName} {feedback.user.lastName}
          </Text>
          <Flex alignItems="center" fontSize="sm" gap={2}>
            <Icon color="yellow.400" as={FaStar} />
            <Text color="yellow.400" fontWeight={700}>
              {feedback.rate.toFixed(1)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppFeedbackItem;
