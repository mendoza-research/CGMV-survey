import usePageNavigation from "hooks/usePageNavigation";
import { ISingleQuestion } from "typings/survey";
import { AnimationEnum } from "typings/animation";
import SingleQuestionBox from "components/investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text: (
    <>
      <p>
        <strong>
          Select the option that best completes the following sentence.
        </strong>
      </p>
      <p>I would describe my knowledge of investing as:</p>
    </>
  ),
  options: ["Non-existent", "Limited", "Good", "Extensive"],
};

export default function ProfileQ1Page() {
  const nextPathname = "/profile-q2";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <SingleQuestionBox
      fieldName="profile_q1"
      question={question}
      toNext={toNext}
      animation={AnimationEnum.CONFETTI}
    />
  );
}
