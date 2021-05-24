// Gamification animation duration in milliseconds

import { AnimationEnum } from "typings/animation";

// Animation duration in milliseconds
export const ANIMATION_DURATIONS: { [key in AnimationEnum]?: number } = {
  [AnimationEnum.CONFETTI]: 2000,
  [AnimationEnum.FALLING_STARS]: 2500,
  [AnimationEnum.FIREWORKS]: 3000,
  [AnimationEnum.RISING_BALLOONS]: 2000,
};

// Framer-motion animation variants
export const quickFadeInOutVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideInOutVariants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 0.3,
    },
  },
};
