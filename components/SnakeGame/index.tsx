import { useEffect, useRef, useState } from "react";
import styles from "./SnakeGame.module.scss";
import { SnakeGameController } from "lib/snake-game";
import _ from "lodash";
import { useHotkeys } from "react-hotkeys-hook";

const canvasWidth = 520;
const canvasHeight = 400;
const cellWidth = 10;
const snakeSize = 4;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  let snakeGame: SnakeGameController = null;

  useEffect(() => {
    if (canvasRef.current && !snakeGame) {
      snakeGame = new SnakeGameController({
        canvasWidth,
        canvasHeight,
        cellWidth,
        snakeSize,
        canvasRef,
      });
    }

    return () => {
      if (snakeGame) {
        snakeGame.stop();
      }
    };
  }, []);

  useHotkeys("space", (e) => {
    e.preventDefault();
    if (snakeGame && !snakeGame.isPlaying) {
      snakeGame.start();
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  );
}
