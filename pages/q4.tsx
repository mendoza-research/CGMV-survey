import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text:
    "Five years from now, what do you expect your standard of living to be?",
  options: [
    "Worse than it is today",
    "The same as it is today",
    "Better than it is today",
  ],
};

export default function Q4Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/profile-complete",
  });

  return (
    <SingleQuestionBox
      fieldName="q4"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.FIREWORKS}
    />
  );
}
