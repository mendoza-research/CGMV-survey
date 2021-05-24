import { ANIMATION_DURATIONS } from "survey-settings";
import { AnimationEnum } from "typings/animation";

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
