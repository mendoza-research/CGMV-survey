import { RefObject } from "react";
import _ from "lodash";

export enum SnakeDirectionEnum {
  UP = "up",
  RIGHT = "right",
  DOWN = "down",
  LEFT = "left",
}

type TVector = {
  x: number;
  y: number;
};

export class SnakeGameController {
  canvasWidth: number;
  canvasHeight: number;
  keydownHandler: (e) => void;
  cellWidth: number;
  snakeSize: number;
  canvasRef: RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  startTime: Date;
  isPlaying: boolean;
  snakePos: TVector;
  applePos: TVector;
  snakeCells: TVector[];
  snakeDirection: SnakeDirectionEnum;
  score: number;
  intervalControl: any;

  constructor({
    canvasWidth,
    canvasHeight,
    cellWidth,
    snakeSize,
    canvasRef,
  }: {
    canvasWidth: number;
    canvasHeight: number;
    cellWidth: number;
    snakeSize: number;
    canvasRef: RefObject<HTMLCanvasElement>;
  }) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.cellWidth = cellWidth;
    this.snakeSize = snakeSize;
    this.canvasRef = canvasRef;
    this.ctx = canvasRef.current.getContext("2d");
    this.snakePos = null;
    this.applePos = null;
    this.snakeDirection = SnakeDirectionEnum.RIGHT;
    this.score = 0;
    this.isPlaying = false;
  }

  handleKeydown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.snakeDirection = SnakeDirectionEnum.UP;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      this.snakeDirection = SnakeDirectionEnum.RIGHT;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.snakeDirection = SnakeDirectionEnum.DOWN;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.snakeDirection = SnakeDirectionEnum.LEFT;
    }
  }

  bindKeys() {
    this.keydownHandler = this.handleKeydown.bind(this);
    document.addEventListener("keydown", this.keydownHandler);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.keydownHandler);
  }

  initSnake() {
    this.snakeCells = [];
    // for (let i = 0; i < this.snakeSize; i++) {
    //   this.snakeCells.push({ x: i, y: 0 });
    // }

    for (let i = this.snakeSize - 1; i >= 0; i--) {
      this.snakeCells.push({ x: i, y: 0 });
    }
  }

  initApple() {
    this.applePos = {
      x: Math.round(
        (Math.random() * (this.canvasWidth - this.cellWidth)) / this.cellWidth
      ),
      y: Math.round(
        (Math.random() * (this.canvasHeight - this.cellWidth)) / this.cellWidth
      ),
    };
  }

  start() {
    this.bindKeys();
    this.restart();
    this.startTime = new Date();
    this.isPlaying = true;

    if (!this.intervalControl) {
      this.intervalControl = setInterval(() => {
        this.updateFrame();
      }, 100);
    }
  }

  restart() {
    this.initSnake();
    this.initApple();
    this.snakeDirection = SnakeDirectionEnum.RIGHT;
    this.score = 0;
  }

  stop() {
    this.unbindKeys();
    this.isPlaying = false;

    if (this.intervalControl) {
      clearInterval(this.intervalControl);
    }
  }

  updateFrame() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.snakePos = _.cloneDeep(this.snakeCells[0]);

    switch (this.snakeDirection) {
      case SnakeDirectionEnum.RIGHT:
        this.snakePos.x++;
        break;
      case SnakeDirectionEnum.LEFT:
        this.snakePos.x--;
        break;
      case SnakeDirectionEnum.UP:
        this.snakePos.y--;
        break;
      case SnakeDirectionEnum.DOWN:
        this.snakePos.y++;
        break;
    }

    if (this.didCollide()) {
      this.restart();
      return;
    }

    if (_.isEqual(this.snakePos, this.applePos)) {
      this.score++;
      this.initApple();
    } else {
      this.snakeCells.pop();
    }
    this.snakeCells.unshift(_.cloneDeep(this.snakePos));

    this.drawScoreText();
    this.drawSnake();
    this.drawApple();
  }

  drawSnake() {
    this.snakeCells.forEach((pos, i) => {
      this.drawCell(pos);
    });
  }

  drawApple() {
    this.ctx.fillStyle = "crimson";
    this.ctx.beginPath();
    this.ctx.arc(
      this.applePos.x * this.cellWidth + 6,
      this.applePos.y * this.cellWidth + 6,
      4,
      0,
      2 * Math.PI,
      false
    );

    this.ctx.fill();
  }

  drawScoreText() {
    this.ctx.fillStyle = "#bbb";
    this.ctx.font = "20px Lato";
    this.ctx.fillText(`Score: ${this.score}`, 5, this.canvasHeight - 5);
  }

  drawCell(pos: TVector) {
    this.ctx.fillStyle = "yellowgreen";
    this.ctx.fillRect(
      pos.x * this.cellWidth + 2,
      pos.y * this.cellWidth + 2,
      this.cellWidth - 2,
      this.cellWidth - 2
    );
  }

  didCollide() {
    return (
      this.snakePos.x === -1 ||
      this.snakePos.x === this.canvasWidth / this.cellWidth ||
      this.snakePos.y === -1 ||
      this.snakePos.y === this.canvasHeight / this.cellWidth
    );
  }

  // Return the total amount of game played in duration
  getPlayDuration() {
    return Math.round((new Date().getTime() - this.startTime.getTime()) / 1000);
  }
}
