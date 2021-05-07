import usePageNavigation from "hooks/usePageNavigation";
import { AnimationEnum, ISingleQuestion } from "typings/survey";
import SingleQuestionBox from "components/investment_/SingleQuestionBox";

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
  const { toNext } = usePageNavigation({
    nextPathname: "/q2",
  });

  return (
    <SingleQuestionBox
      question={question}
      toNext={toNext}
      animation={AnimationEnum.CONFETTI}
    />
  );
}
