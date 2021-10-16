import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text: (
    <p>
      Five years from now, what do you expect your standard of living to be?
    </p>
  ),
  options: [
    "Worse than it is today",
    "The same as it is today",
    "Better than it is today",
  ],
};

export default function ProfileQ4Page() {
  const nextPathname = "/profile-complete";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <SingleQuestionBox
      fieldName="profile_q4"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.FIREWORKS}
    />
  );
}
