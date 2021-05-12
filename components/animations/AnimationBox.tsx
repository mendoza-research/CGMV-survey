import { AnimationEnum } from "typings/animation";
import dynamic from "next/dynamic";
import Confetti from "components/animations/Confetti";
import FallingStars from "components/animations/FallingStars";
import RisingBalloons from "components/animations/RisingBalloons";

const Fireworks = dynamic(() => import("./Fireworks"), {
  ssr: false,
});

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
