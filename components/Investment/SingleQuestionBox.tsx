import Layout from "components/Layout";
import { useForm } from "react-hook-form";
import { ISingleQuestion } from "typings/survey";
import styles from "./investment.module.scss";
import clsx from "clsx";
import { useResizeDetector } from "react-resize-detector";
import Confetti from "react-confetti";
import { IoIosArrowForward } from "react-icons/io";

type FormValues = {
  response: string;
};

export interface ISingleQuestionBoxProps {
  isGamification: boolean;
  showAnimation: boolean;
  question: ISingleQuestion;
  handleNextButtonClick: (
    userResponseString: string,
    userResponseNumber: number
  ) => void;
}

export default function SingleQuestionBox({
  isGamification,
  showAnimation,
  question,
  handleNextButtonClick,
}: ISingleQuestionBoxProps) {
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

  return (
    <Layout>
      <main
        className={clsx(styles.investmentBox, {
          [styles.gamification]: isGamification,
          [styles.noGamification]: !isGamification,
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
              onClick={(e) => {
                e.preventDefault();
                handleNextButtonClick(userResponseString, userResponseNumber);
              }}
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
              handleNextButtonClick(userResponseString, userResponseNumber);
            }}
          >
            <IoIosArrowForward className={styles.reactIcon} />
          </span>
        </div>
      </main>
    </Layout>
  );
}
