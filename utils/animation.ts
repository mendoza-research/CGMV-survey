import { ANIMATION_DURATIONS } from "survey-settings";
import { AnimationEnum } from "typings/animation";

export const noAnimationVariants = {
  hidden: {},
  visible: {},
  exit: {},
};

// Framer-motion animation variants
export const fadeOutVariants = {
  hidden: {},
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

export function getAnimationDuration(animation: AnimationEnum): number {
  // If animation is null or undefined, return 0
  if (!animation) {
    return 0;
  }

  // Find and return the duration from survey-settings.ts
  if (ANIMATION_DURATIONS.hasOwnProperty(animation)) {
    return ANIMATION_DURATIONS[animation];
  }

  // If unknown animation type, return 0
  return 0;
}

export function getFadeOutVariants(shouldAnimate: boolean) {
  return shouldAnimate ? fadeOutVariants : noAnimationVariants;
}

export function getFadeInOutVariants(shouldAnimate: boolean) {
  return shouldAnimate ? quickFadeInOutVariants : noAnimationVariants;
}

export function getSlideInOutVariants(shouldAnimate: boolean) {
  return shouldAnimate ? slideInOutVariants : noAnimationVariants;
}
