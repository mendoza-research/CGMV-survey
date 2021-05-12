import { AnimationEnum } from "typings/animation";
import AnimationBox from "components/animations/AnimationBox";

export default function FireworksTestPage() {
  return (
    <div
      style={{
        width: 800,
        height: 600,
        background: "#e5e5e5",
      }}
    >
      <AnimationBox animation={AnimationEnum.FIREWORKS} />
    </div>
  );
}
