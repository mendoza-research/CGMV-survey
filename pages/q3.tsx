import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text: (
    <p>
      What is the time frame in which you hope to achieve your primary financial
      goal?
    </p>
  ),
  options: ["0 - 4 Years", "5 - 9 Years", "10 Years or Longer"],
};

export default function Q3Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/q4",
  });

  return (
    <SingleQuestionBox
      fieldName="q3"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.RISING_BALLOONS}
    />
  );
}
