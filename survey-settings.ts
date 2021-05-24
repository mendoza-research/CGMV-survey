import { AnimationEnum } from "typings/animation";

// Animation duration in milliseconds
export const ANIMATION_DURATIONS: { [key in AnimationEnum]?: number } = {
  [AnimationEnum.CONFETTI]: 2000,
  [AnimationEnum.FALLING_STARS]: 2500,
  [AnimationEnum.FIREWORKS]: 3000,
  [AnimationEnum.RISING_BALLOONS]: 2000,
};
