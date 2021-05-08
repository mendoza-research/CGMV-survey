import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text:
    "Of the options below, which best describes your primary financial goal?",
  options: [
    "Wealth Preservation",
    "Retirement Planning",
    "Wealth Accumulation",
  ],
};

export default function Q2Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/q3",
  });

  return (
    <SingleQuestionBox
      fieldName="q2"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.FALLING_STARS}
    />
  );
}
