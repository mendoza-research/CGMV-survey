import { AnimationEnum } from "typings/animation";
import Confetti from "components/animations/Confetti";
import FallingStars from "components/animations/FallingStars";
import RisingBalloons from "components/animations/RisingBalloons";
import Fireworks from "./Fireworks";

interface IAnimationBoxProps {
  animation: AnimationEnum;
}

export default function AnimationBox({ animation }: IAnimationBoxProps) {
  switch (animation) {
    case AnimationEnum.CONFETTI:
      return <Confetti />;
    case AnimationEnum.FALLING_STARS:
      return <FallingStars />;
    case AnimationEnum.RISING_BALLOONS:
      return <RisingBalloons />;
    case AnimationEnum.FIREWORKS:
      return <Fireworks />;
    default:
      return <div />;
  }
}
