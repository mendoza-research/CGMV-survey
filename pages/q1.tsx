import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { useMutation } from "@apollo/client";
import { GamificationEnum, ISingleQuestion } from "typings/survey";
import { getSingleQuestionUpdateQuery } from "utils/gql-queries";
import SingleQuestionBox from "components/Investment/SingleQuestionBox";

const question: ISingleQuestion = {
  text: (
    <>
      Of the options below, which best describes your primary financial goal?
      <br />
      <br />
      When considering investments, I am _______
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
  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification = useSurveyStore((state) => state.gamification);
  const RECORD_SINGLE_RESPONSE = getSingleQuestionUpdateQuery("q1");
  const [recordSingleResponseToDb] = useMutation(RECORD_SINGLE_RESPONSE);
  const isGamification = gamification === GamificationEnum.GAMIFICATION;

  const handleNextButtonClick = async (
    userResponseString,
    userResponseNumber
  ) => {
    await recordSingleResponseToDb({
      variables: {
        session_id: sessionId,
        response_num: userResponseNumber,
        response_text: userResponseString,
      },
    });

    toNext();
  };

  return (
    <SingleQuestionBox
      isGamification={isGamification}
      showAnimation={false}
      question={question}
      handleNextButtonClick={handleNextButtonClick}
    />
  );
}
