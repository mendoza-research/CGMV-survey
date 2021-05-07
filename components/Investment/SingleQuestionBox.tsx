import Layout from "components/Layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResizeDetector } from "react-resize-detector";
import useSurveyStore from "stores/useSurveyStore";
import { useMutation } from "@apollo/client";
import {
  AnimationEnum,
  GamificationEnum,
  ISingleQuestion,
} from "typings/survey";
import { getSingleQuestionUpdateQuery } from "utils/gql-queries";
import styles from "./investment.module.scss";
import clsx from "clsx";
import Confetti from "react-confetti";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

type FormValues = {
  response: string;
};

export interface ISingleQuestionBoxProps {
  question: ISingleQuestion;
  toNext: () => void;
  animation?: AnimationEnum;
}

export default function SingleQuestionBox({
  question,
  toNext,
  animation,
}: ISingleQuestionBoxProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification = useSurveyStore((state) => state.gamification);
  const RECORD_SINGLE_RESPONSE = getSingleQuestionUpdateQuery("q1");
  const [recordSingleResponseToDb] = useMutation(RECORD_SINGLE_RESPONSE);

  const {
    width: animationWrapperWidth,
    height: animationWrapperHeight,
    ref: animationWrapperRef,
  } = useResizeDetector();

  const { register, watch, formState } = useForm<FormValues>({
    mode: "onChange",
  });

  // User response in string (e.g., "Wealth Preservation")
  const userResponseString = watch("response");

  // User reponse in number (e.g., 1, 2, 3, 4)
  const userResponseNumber =
    question["options"].indexOf(userResponseString) + 1;

  const handleNextButtonClick = async (e) => {
    e.preventDefault();

    // Only proceed if form state is valid (e.g., all required inputs are filled out)
    if (!formState.isValid) return;

    if (sessionId) {
      await recordSingleResponseToDb({
        variables: {
          session_id: sessionId,
          response_num: userResponseNumber,
          response_text: userResponseString,
        },
      });
    }

    if (gamification === GamificationEnum.GAMIFICATION) {
      setShowAnimation(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    toNext();
  };

  return (
    <Layout>
      <main
        className={clsx(styles.investmentBox, {
          [styles.gamification]: gamification === GamificationEnum.GAMIFICATION,
          [styles.noGamification]:
            gamification === GamificationEnum.NO_GAMIFICATION,
        })}
      >
        {showAnimation && (
          <div className={styles.animationWrapper} ref={animationWrapperRef}>
            <Confetti
              width={animationWrapperWidth}
              height={animationWrapperHeight}
              initialVelocityX={8}
              initialVelocityY={20}
              numberOfPieces={100}
              gravity={0.4}
            />
          </div>
        )}
        <AnimatePresence>
          {!showAnimation && (
            <motion.div
              key="card"
              className={styles.card}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -200 },
              }}
            >
              <p>{question.text}</p>

              <div className={styles.singleQuestionForm}>
                {question.options.map((o) => (
                  <label
                    key={o}
                    className={clsx(styles.radioLabel, {
                      [styles.selected]: o === userResponseString,
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.rightNavigation}>
          <span
            className={clsx(styles.navButton, {
              [styles.disabled]: !formState.isValid,
            })}
            onClick={handleNextButtonClick}
          >
            <IoIosArrowForward className={styles.reactIcon} />
          </span>
        </div>
      </main>
    </Layout>
  );
}
