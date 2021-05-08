import { useResizeDetector } from "react-resize-detector";
import { motion } from "framer-motion";
import styles from "./test.module.scss";
import clsx from "clsx";

interface IBalloon {
  width: number;
  height: number;
  color: string;
}

function Balloon() {
  return <div className={clsx(styles.balloon, styles.large, styles.blue)} />;
}

export default function RisingBalloons() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  let balloons: IBalloon[] = [
    {
      width: 200,
      height: 300,
      color: "green",
    },
  ];

  return (
    <div
      ref={animationBoxRef}
      style={{
        width: animationBoxWidth,
        height: animationBoxHeight,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {balloons.map((balloon) => (
          <Balloon />
        ))}
      </div>
    </div>
  );
}
