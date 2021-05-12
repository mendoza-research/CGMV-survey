import { useResizeDetector } from "react-resize-detector";
import styles from "./animations-common.module.scss";
import Sketch from "react-p5";
import p5Types from "p5";
import { useEffect, useState } from "react";

const SHELLTYPES = [
  "simple",
  "split",
  "burst",
  "double",
  "mega",
  "writer",
  "pent",
  "comet",
];
const GRAVITY = 0.2;

export default function Fireworks() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  const [isContainerReady, setIsContainerReady] = useState(false);

  useEffect(() => {
    if (animationBoxWidth) {
      setIsContainerReady(true);
    }
  }, [animationBoxWidth]);

  let shells = [];
  let stars = [];

  function setup(p5: p5Types, animationBoxRef) {
    p5.createCanvas(animationBoxWidth, animationBoxHeight).parent(
      animationBoxRef
    );
    p5.strokeWeight(4);
    p5.colorMode(p5.HSB);
  }

  /* 
  From p5.js docs: Called directly after setup(), the draw() function continuously 
  executes the lines of code contained inside its block until the program is 
  stopped or noLoop() is called. 
  */
  function draw(p5: p5Types) {
    p5.translate(p5.width / 2, p5.height);
    // p5.background("#e6e6e6");

    /* Remove the exploded shells and burnt out stars */
    shells = shells.filter((shell) => !shell.exploded);
    stars = stars.filter((star) => star.brt > 0);

    /* Draw the shells and stars */
    for (let shell of shells) shell.draw();
    for (let star of stars) star.draw();

    /* Generate new shell with small probability */
    if (p5.random() < 0.3) {
      let s = new Shell(p5);
      shells.push(s);
    }
  }

  class Shell {
    p5: p5Types;
    position: p5Types.Vector;
    speed: p5Types.Vector;
    sparkleTrail: boolean;
    type: string;
    fuse: number;
    hue: number;
    exploded: boolean;

    constructor(p5: p5Types) {
      this.p5 = p5;
      this.position = p5.createVector(
        p5.int(p5.random(-p5.width / 5, p5.width / 5)),
        0
      );
      this.speed = p5.createVector(p5.random(-2, 2), -p5.random(11, 16));
      this.sparkleTrail = p5.random() < 0.5;
      this.type = SHELLTYPES[Math.floor(Math.random() * SHELLTYPES.length)];
      this.fuse = p5.random(-3, -1);
      this.hue = p5.round(p5.random(0, 360));
      this.exploded = false;
    }

    draw() {
      const p5 = this.p5;

      if (this.fuse < this.speed.y) {
        this.explode();
        return;
      }

      if (this.sparkleTrail) {
        let sparkleDir = p5.random(0, p5.TWO_PI);
        let sparkleVel = p5.random(0, 1);
        let sparkleSpd = p5.createVector(
          sparkleVel * p5.cos(sparkleDir),
          sparkleVel * p5.sin(sparkleDir)
        );
        let sparklePos = p5.createVector(
          this.position.x + sparkleSpd.x,
          this.position.y + sparkleSpd.y
        );
        let s = new Star({
          p5,
          position: sparklePos,
          speed: sparkleSpd,
          hue: p5.floor(p5.random(20, 40)),
          sat: p5.floor(p5.random(0, 30)),
          type: undefined,
        });
        stars.push(s);
      }

      p5.stroke(this.hue + p5.round(p5.random(-10, 10)), p5.random(0, 20), 90);
      p5.point(this.position.x, this.position.y);

      this.position.add(this.speed);
      this.speed.y = this.speed.y + GRAVITY;
    }

    drawStars({
      numStars,
      velMin,
      velMax,
      type,
      baseDir,
      angle,
    }: {
      numStars: number;
      velMin: number;
      velMax: number;
      type?: string;
      baseDir?: number;
      angle?: number;
    }) {
      const p5 = this.p5;

      for (let i = 0; i < numStars; i++) {
        let dir = p5.random(0, p5.TWO_PI);
        if (typeof baseDir !== "undefined")
          dir = baseDir + p5.random(0, p5.PI / angle);
        let vel = p5.random(velMin, velMax);
        let starSpd = p5.createVector(
          this.speed.x + vel * p5.cos(dir),
          this.speed.y + vel * p5.sin(dir)
        );
        let hue = this.hue + p5.round(p5.random(-10, 10));
        let sat = p5.round(p5.random(0, 40));
        let star = new Star({
          p5: this.p5,
          position: this.position.copy(),
          speed: starSpd,
          hue,
          sat,
          type: typeof type === "undefined" ? "default" : type,
        });

        stars.push(star);
      }
    }

    explode() {
      const p5 = this.p5;

      if (this.type == "split") {
        this.drawStars({
          numStars: 30,
          velMin: 3,
          velMax: 5,
          type: "writer",
        });

        this.drawStars({
          numStars: 10,
          velMin: 3,
          velMax: 5,
          type: "sparkler",
        });
      } else if (this.type == "burst") {
        this.drawStars({
          numStars: 60,
          velMin: 0,
          velMax: 6,
          type: "sparkler",
        });
      } else if (this.type == "double") {
        this.drawStars({
          numStars: 90,
          velMin: 3,
          velMax: 5,
        });

        this.drawStars({
          numStars: 90,
          velMin: 0.5,
          velMax: 2,
          type: "writer",
        });
      } else if (this.type == "mega") {
        this.drawStars({
          numStars: 600,
          velMin: 0,
          velMax: 8,
        });
      } else if (this.type == "writer") {
        this.drawStars({
          numStars: 100,
          velMin: 0,
          velMax: 5,
          type: "writer",
        });
      } else if (this.type == "simple") {
        this.drawStars({
          numStars: 100,
          velMin: 0,
          velMax: 5,
        });
      } else if (this.type == "pent") {
        let baseDir = p5.random(0, p5.TWO_PI);

        for (let i = 2; i <= 10; i += 2) {
          this.drawStars({
            numStars: 20,
            velMin: 3,
            velMax: 5,
            type: "writer",
            baseDir: baseDir + (i / 5) * p5.PI,
            angle: 6,
          });
        }
      } else if (this.type == "comet") {
        let baseDir = p5.random(0, p5.TWO_PI);

        for (let i = 2; i <= 6; i += 2) {
          this.drawStars({
            numStars: 10,
            velMin: 3,
            velMax: 7,
            type: "sparkler",
            baseDir: baseDir + (i / 3) * p5.PI,
            angle: 128,
          });
        }

        this.drawStars({
          numStars: 200,
          velMin: 0,
          velMax: 8,
          type: "writer",
        });
      }
      this.exploded = true;
    }
  }

  class Star {
    p5: p5Types;
    position: any;
    speed: any;
    hue: any;
    sat: any;
    type: string;
    brt: number;
    burntime: number;

    constructor({ p5, position, speed, hue, sat, type }) {
      this.p5 = p5;
      this.position = position;
      this.speed = speed;
      this.hue = hue;
      this.sat = sat;
      this.type = typeof type === "undefined" ? "default" : type;
      this.brt = 255;
      this.burntime = 0;
    }

    draw() {
      const p5 = this.p5;

      p5.stroke(this.hue, this.sat, this.brt);
      let newXPos = this.position.x + p5.log(this.burntime) * 8 * this.speed.x;
      let newYPos =
        this.position.y +
        p5.log(this.burntime) * 8 * this.speed.y +
        this.burntime * GRAVITY;

      // p5.point(newXPos, newYPos);

      if (this.type == "writer" && this.burntime > 1) {
        p5.line(
          newXPos,
          newYPos,
          this.position.x + p5.log(this.burntime - 2) * 8 * this.speed.x,
          this.position.y +
            p5.log(this.burntime - 2) * 8 * this.speed.y +
            this.burntime * GRAVITY
        );
      }

      if (this.type == "sparkler") {
        let dir = p5.random(0, p5.TWO_PI);
        let vel = p5.random(0, 1);
        let starSpd = p5.createVector(vel * p5.cos(dir), vel * p5.sin(dir));
        let star = new Star({
          p5,
          position: p5.createVector(newXPos + starSpd.x, newYPos + starSpd.y),
          speed: starSpd,
          hue: p5.round(p5.random(20, 40)),
          sat: p5.round(p5.random(0, 30)),
          type: "default",
        });
        stars.push(star);
      }

      this.burntime++;
    }
  }

  function windowResized(p5) {
    p5.resizeCanvas(animationBoxWidth, animationBoxHeight);
  }

  return (
    <div ref={animationBoxRef} className={styles.animationBox}>
      {isContainerReady && (
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      )}
    </div>
  );
}
