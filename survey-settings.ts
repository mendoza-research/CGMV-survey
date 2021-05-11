// Gamification animation duration in milliseconds
// 2000 == 2 seconds
export const ANIMATION_DURATION = 2000;

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
