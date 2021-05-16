import { useEffect, useRef, useState } from "react";
import { SnakeGameController } from "lib/snake-game";
import _ from "lodash";
import { useHotkeys } from "react-hotkeys-hook";

const canvasWidth = 520;
const canvasHeight = 400;
const cellWidth = 10;
const snakeSize = 4;
const fps = 10;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let snakeGame: SnakeGameController = null;

  useEffect(() => {
    if (canvasRef.current && !snakeGame) {
      snakeGame = new SnakeGameController({
        canvasWidth,
        canvasHeight,
        cellWidth,
        snakeSize,
        canvasRef,
        fps,
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
        style={{ border: "2px solid #999" }}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  );
}
