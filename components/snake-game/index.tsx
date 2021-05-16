import { useEffect, useRef } from "react";
import styles from "./snake-game.module.scss";
import { Game } from "lib/snake-game";

export default function SnakeGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(`useEffect`);
    console.log(canvasRef.current);
    let snake = new Game.Snake(canvasRef, { fps: 100, size: 4 });
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} className={styles.stage} height="400" width="520" />
  );
}
