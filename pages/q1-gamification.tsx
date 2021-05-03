import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import styles from "styles/investment.module.scss";
import { Gamification } from "typings/survey";
import clsx from "clsx";
import { useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import Confetti from "react-confetti";
import { IoIosArrowForward } from "react-icons/io";

type FormValues = {
  response: string;
};

const RECORD_SINGLE_RESPONSE = gql`
  mutation RecordQ1Response($session_id: uuid!, $response: String) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: { q1: $response }
    ) {
      session_id
    }
  }
`;

const question = {
  text: (
    <>
      Select the option that best completes the following sentence.
      <br />
      <br />
      When considering investments, I am _______
    </>
  ),
  options: [
    "Most concerned about my investment losing value.",
    "Equally concerned about my investment losing or gaining value.",
    "Most concerned about my investment gaining value.",
  ],
};

export default function Q1Page() {
  const toNext = () => {};

  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification =
    Math.random() >= 0
      ? Gamification.GAMIFICATION
      : Gamification.NO_GAMIFICATION;
  const {
    width: animationWrapperWidth,
    height: animationWrapperHeight,
    ref: animationWrapperRef,
  } = useResizeDetector();

  const { register, watch, formState } = useForm<FormValues>({
    mode: "onChange",
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const userResponse = watch("response");
  const [recordSingleResponseToDb] = useMutation(RECORD_SINGLE_RESPONSE);

  console.log(`gamification=${gamification}`);

  const handleNextButtonClick = async () => {
    await recordSingleResponseToDb({
      variables: {
        session_id: sessionId,
        response: userResponse,
      },
    });

    toNext();
  };

  return (
    <Layout>
      <main
        className={clsx(styles.investmentBox, {
          [styles.gamification]: gamification === Gamification.GAMIFICATION,
          [styles.noGamification]:
            gamification === Gamification.NO_GAMIFICATION,
        })}
      >
        {showAnimation && (
          <div className={styles.animationWrapper} ref={animationWrapperRef}>
            <Confetti
              width={animationWrapperWidth}
              height={animationWrapperHeight}
            />
          </div>
        )}
        <div className={styles.card}>
          <p>{question.text}</p>

          <div className={styles.singleQuestionForm}>
            {question.options.map((o) => (
              <label
                key={o}
                className={clsx(styles.radioLabel, {
                  [styles.selected]: o === userResponse,
                })}
              >
                <input
                  {...register("response", { required: true })}
                  type="radio"
                  value={o}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>

          <div className={styles.bottomNavigation}>
            <button
              disabled={!formState.isValid}
              onClick={handleNextButtonClick}
            >
              Next
            </button>
          </div>
        </div>

        <div className={styles.rightNavigation}>
          <span
            className={styles.navButton}
            onClick={(e) => {
              e.preventDefault();
              setShowAnimation(true);
            }}
          >
            <IoIosArrowForward className={styles.reactIcon} />
          </span>
        </div>
      </main>
    </Layout>
  );
}
