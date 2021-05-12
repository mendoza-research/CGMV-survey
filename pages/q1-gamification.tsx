import { GamificationEnum, ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";
import { useEffect } from "react";
import useSurveyStore from "stores/useSurveyStore";

const question: ISingleQuestion = {
  text: (
    <>
      <p>
        <strong>
          Of the options below, which best describes your primary financial
          goal?
        </strong>
      </p>
      <p>When considering investments, I am _______</p>
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

  const setGamification = useSurveyStore((state) => state.setGamification);

  useEffect(() => {
    setGamification(GamificationEnum.GAMIFICATION);
  }, []);

  return (
    <SingleQuestionBox
      fieldName="q1"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.FIREWORKS}
    />
  );
}
