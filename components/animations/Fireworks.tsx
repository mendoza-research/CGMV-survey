import { useResizeDetector } from "react-resize-detector";
import styles from "./animations-common.module.scss";

export default function Fireworks() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  return (
    <div ref={animationBoxRef} className={styles.animationBox}>
      Fireworks
    </div>
  );
}
