import Confetti from "react-confetti";
import { IAnimationBoxProps } from "typings/animation";

export default function ConfettiAnimationBox({
  width,
  height,
}: IAnimationBoxProps) {
  return (
    <Confetti
      width={width}
      height={height}
      initialVelocityX={8}
      initialVelocityY={20}
      numberOfPieces={100}
      gravity={0.4}
    />
  );
}
