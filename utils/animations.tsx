import { AnimationEnum } from "typings/animation";
import Confetti from "components/animations/Confetti";
import FallingStars from "components/animations/FallingStars";
import RisingBalloons from "components/animations/RisingBalloons";

export const getAnimationBox = (animation: AnimationEnum) => {
  switch (animation) {
    case AnimationEnum.CONFETTI:
      return <Confetti />;
    case AnimationEnum.FALLING_STARS:
      return <FallingStars />;
    case AnimationEnum.RISING_BALLOONS:
      return <RisingBalloons />;
    default:
      return <div />;
  }
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
