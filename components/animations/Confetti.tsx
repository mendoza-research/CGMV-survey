import { default as ReactConfetti } from "react-confetti";
import { useResizeDetector } from "react-resize-detector";
import styles from "./animations-common.module.scss";

export default function Confetti() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  return (
    <div ref={animationBoxRef} className={styles.animationBox}>
      <ReactConfetti
        width={animationBoxWidth}
        height={animationBoxHeight}
        initialVelocityX={8}
        initialVelocityY={20}
        numberOfPieces={100}
        gravity={0.4}
      />
    </div>
  );
}
