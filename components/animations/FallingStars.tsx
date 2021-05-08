import { useEffect, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import styles from "./animations.module.scss";

function rand(ar) {
  return Math.random() * (ar[1] - ar[0]) + ar[0];
}

export default function FallingStars() {
  const {
    width: animationBoxWidth,
    height: animationBoxHeight,
    ref: animationBoxRef,
  } = useResizeDetector();

  let w, h, ctx;
  let frame = (Math.random() * 360) | 0;
  let animationRequestId;
  const size = [20, 60];
  const shineDir = [0.01, 0.05];
  const angSpeed = [0.03, 0.1];
  const stars = [];
  const pentaRadiant = (Math.PI * 2) / 5;

  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  function Star() {
    this.size = rand(size);
    this.x = Math.random() * w;
    this.y = -this.size * 2;
    this.vy = this.size / 10;
    this.vx = Math.random() * 6 - 3;
    this.ay = this.size / 5000;
    this.shine = 0;
    this.shineDir = rand(shineDir);
    this.color = "hsla(hue, 80%, brightness%, .15)".replace(
      "hue",
      (frame % 360).toString()
    );
    this.rot = Math.random() * 2 * Math.PI;
    this.omega = rand(angSpeed);
    if (Math.random() < 0.5) this.omega *= -1;
  }
  Star.prototype.use = function () {
    this.x += this.vx;
    this.y += this.vy += this.ay;

    var newShine = this.shine + this.shineDir;
    if (newShine < 0 || newShine > 1) this.shineDir *= -1;
    else this.shine = newShine;
    this.rot += this.omega;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color.replace(
      "brightness",
      (0.25 + this.shine / 2) * 100
    );
    ctx.beginPath();
    ctx.moveTo(this.size, 0);

    for (var i = 0; i < 5; ++i) {
      var rad = pentaRadiant * i,
        halfRad = rad + pentaRadiant / 2;
      ctx.lineTo(Math.cos(rad) * this.size, Math.sin(rad) * this.size);
      ctx.lineTo(
        (Math.cos(halfRad) * this.size) / 2,
        (Math.sin(halfRad) * this.size) / 2
      );
    }
    ctx.closePath();

    ctx.fill();

    ctx.rotate(-this.rot);
    ctx.translate(-this.x, -this.y);
  };

  function anim() {
    animationRequestId = window.requestAnimationFrame(anim);

    ++frame;

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    if (Math.random() < 0.3) stars.push(new Star());

    for (var s = 0; s < stars.length; ++s) {
      stars[s].use();

      if (stars[s].x + stars[s].size < 0) {
        stars.splice(s, 1);
        --s;
      }
    }
  }

  useEffect(() => {
    w = canvasEl.current.width = window.innerWidth;
    h = canvasEl.current.height = window.innerHeight;
    ctx = canvasEl.current.getContext("2d");
    anim();

    return () => {
      // Cancel animation frame request previously scheduled
      window.cancelAnimationFrame(animationRequestId);
    };
  }, []);

  return (
    <div ref={animationBoxRef} className={styles.animationBox}>
      <canvas
        ref={canvasEl}
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          width: animationBoxWidth,
          height: animationBoxHeight,
        }}
      />
    </div>
  );
}
