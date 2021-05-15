import { useMutation } from "@apollo/client";
import Layout from "components/Layout";
import SnakeGame from "components/snake-game";
import usePageNavigation from "hooks/usePageNavigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSurveyStore from "stores/useSurveyStore";
import { RECORD_OPTIONAL_GAME_PAGE_QUERY } from "utils/gql-queries";

export default function OptionalGamePage() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const { toNext } = usePageNavigation({
    nextPathname: "/payment-code",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const [isPlaying, setIsPlaying] = useState(false);

  const [recordOptionalGamePageToDb] = useMutation(
    RECORD_OPTIONAL_GAME_PAGE_QUERY
  );

  const onSubmit = async (data) => {
    await recordOptionalGamePageToDb({
      variables: {
        session_id: sessionId,
        game_duration: 0,
        final_thoughts: data["final_thoughts"],
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
            <SnakeGame />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("final_thoughts")}
            />
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <input type="submit" className="button" value="Finish" />
          </div>
        </form>
      </main>
    </Layout>
  );
}
