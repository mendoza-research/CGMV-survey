import { useResizeDetector } from "react-resize-detector";
import styles from "./animations-common.module.scss";
import balloonStyles from "./RisingBalloons.module.scss";
import { motion } from "framer-motion";
import clsx from "clsx";
import _ from "lodash";

enum BalloonColorEnum {
  YELLOW = "yellow",
  ORANGE = "orange",
  GREEN = "green",
  BLUE = "blue",
  VIOLET = "violet",
  RED = "red",
}

enum BalloonSizeEnum {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface IBalloonProps {
  color: BalloonColorEnum;
  size: BalloonSizeEnum;
  initialX: number;
  initialY: number;
}

let balloons: IBalloonProps[] = [];

for (let i = 0; i < 40; i++) {
  let color = _.sample(Object.values(BalloonColorEnum)) as BalloonColorEnum;
  let size = _.sample(Object.values(BalloonSizeEnum)) as BalloonSizeEnum;

  balloons.push({
    color,
    size,
    initialX: _.random(-5, 105, true),
    initialY: _.random(-10, 140, false),
  });
}

function Balloon({ color, size, initialX, initialY }: IBalloonProps) {
  return (
    <motion.div
      initial="initial"
      animate="exit"
      variants={{
        initial: {
          top: `${initialY}%`,
          left: `${initialX}%`,
          rotate: _.random(-20, 20, false),
        },
        exit: {
          top: `${_.random(-20, -40, false)}%`,
          left: `${initialX + _.random(-8, 8, false)}%`,
          rotate: _.random(-30, 30, false),
          transition: {
            duration: _.random(2, 3),
            ease: "linear",
          },
        },
      }}
      className={clsx(
        balloonStyles.balloon,
        balloonStyles[color],
        balloonStyles[size]
      )}
    />
  );
}

export default function RisingBalloons() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  return (
    <div ref={animationBoxRef} className={styles.animationBox}>
      {balloons.map((balloon, i) => (
        <Balloon key={i} {...balloon} />
      ))}
    </div>
  );
}
