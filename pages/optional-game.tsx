import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { RECORD_OPTIONAL_GAME_PAGE_QUERY } from "utils/gql-queries";
import { SnakeGameController } from "lib/snake-game";
import _ from "lodash";
import { useHotkeys } from "react-hotkeys-hook";

const canvasWidth = 520;
const canvasHeight = 400;
const cellWidth = 10;
const snakeSize = 4;
const fps = 10;

export default function OptionalGamePage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/payment-code",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const [finalThoughts, setFinalThoughts] = useState("");
  const [recordOptionalGamePageToDb] = useMutation(
    RECORD_OPTIONAL_GAME_PAGE_QUERY
  );
  const snakeGameController = useSurveyStore(
    (state) => state.snakeGameController
  );
  const setSnakeGameController = useSurveyStore(
    (state) => state.setSnakeGameController
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && !snakeGameController) {
      const controller = new SnakeGameController({
        canvasWidth,
        canvasHeight,
        cellWidth,
        snakeSize,
        canvasRef,
        fps,
      });

      setSnakeGameController(controller);
    }

    return () => {
      if (snakeGameController) {
        snakeGameController.stop();
      }
    };
  }, [canvasRef]);

  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();

      if (snakeGameController && !snakeGameController.isPlaying) {
        snakeGameController.start();
      }
    },
    [snakeGameController]
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    await recordOptionalGamePageToDb({
      variables: {
        session_id: sessionId,
        game_duration: snakeGameController
          ? snakeGameController.getPlayDuration()
          : 0,
        final_thoughts: finalThoughts,
      },
    });

    toNext();
  };

  return (
    <Layout>
      <main
        style={{
          width: 800,
        }}
      >
        <div>
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Optional Game
          </h2>
          <p>
            Below is a game of Snake. Your participation is optional. You may
            play the game as few or as many times as you wish. When you are
            done, please click “Finish” below. The game is presented for your
            enjoyment only and you will not be penalized or rewarded for your
            participation or performance.
          </p>
          <p style={{ fontWeight: 700, textAlign: "center" }}>
            Press the space bar to begin
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <canvas
              ref={canvasRef}
              style={{ border: "2px solid #999" }}
              width={canvasWidth}
              height={canvasHeight}
            />

            <div style={{ paddingLeft: "20px" }}>
              <Image
                src="/images/arrows_hand.png"
                layout="fixed"
                width={120}
                height={97}
              />
            </div>
          </div>
        </div>

        <div>
          <p>
            <span style={{ fontWeight: 700 }}>
              Please use the space below to share any thoughts you may have
              about this study. Any insights you provide will be extremely
              valuable.
            </span>{" "}
            (No response required)
            <textarea
              style={{
                marginTop: 10,
                width: "100%",
                height: "200px",
              }}
              onFocus={() => {
                if (snakeGameController && snakeGameController.isPlaying) {
                  snakeGameController.pause();
                }
              }}
              onBlur={() => {
                if (snakeGameController && snakeGameController.isPlaying) {
                  snakeGameController.resume();
                }
              }}
              value={finalThoughts}
              onChange={(e) => setFinalThoughts(e.target.value)}
            />
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <a className="button" onClick={onSubmit}>
              Finish
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
