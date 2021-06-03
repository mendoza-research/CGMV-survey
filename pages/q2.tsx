import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text: (
    <p>
      Of the options below, which best describes your primary financial goal?
    </p>
  ),
  options: [
    "Wealth Preservation",
    "Retirement Planning",
    "Wealth Accumulation",
  ],
};

export default function Q2Page() {
  const nextPathname = "/q3";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <SingleQuestionBox
      fieldName="q2"
      question={question}
      prefetchUrl={nextPathname}
      toNext={toNext}
      animation={AnimationEnum.FALLING_STARS}
    />
  );
}
