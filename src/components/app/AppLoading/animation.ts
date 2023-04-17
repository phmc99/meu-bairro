import { keyframes } from '@emotion/react';

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0);  }
  25% { transform: scale(1.2) rotate(0);  }
  50% { transform: scale(1.2) rotate(360deg);  }
  75% { transform: scale(1) rotate(360deg);  }
  100% { transform: scale(1) rotate(0);  }
`;

export const animation = `${animationKeyframes} 2s ease-in-out infinite`;
