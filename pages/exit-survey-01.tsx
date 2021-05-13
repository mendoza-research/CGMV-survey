import Layout from "components/Layout";
import styles from "components/exit-survey/exit-survey.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import usePageNavigation from "hooks/usePageNavigation";
import clsx from "clsx";
import AgreementScale from "components/questions/AgreementScale";
import { useMutation } from "@apollo/client";
import { RECORD_FIRST_EXIT_SURVEY_QUERY } from "utils/gql-queries";
import _ from "lodash";
import { useMemo } from "react";

interface IPageQuestion {
  fieldName: string;
  text: React.ReactNode;
}

const pageQuestions: IPageQuestion[] = [
  {
    fieldName: "attention_check",
    text: (
      <p>
        Select "Strongly Disagree" on the scale below if you are paying
        attention.
      </p>
    ),
  },
  {
    fieldName: "need_to_accomplish",
    text: (
      <p>
        Using the investment platform makes me feel like I need to accomplish
        things.
      </p>
    ),
  },

  {
    fieldName: "strive_for_accomplishment",
    text: (
      <p>
        Using the investment platform pushes me to strive for accomplishments.
      </p>
    ),
  },
  {
    fieldName: "motivates_progress",
    text: (
      <p>
        Using the investment platform motivates me to progress and get better.
      </p>
    ),
  },
  {
    fieldName: "time_pass_quickly",
    text: <p>Using the investment platform makes time pass quickly.</p>,
  },
  {
    fieldName: "grabs_attention",
    text: <p>Using the investment platform grabs all of my attention.</p>,
  },
  {
    fieldName: "lose_myself",
    text: (
      <p>
        Using the investment platform makes me lose myself in what I am doing.
      </p>
    ),
  },
  {
    fieldName: "playful_experience",
    text: (
      <p>
        Using the investment platform provides an overall playful experience.
      </p>
    ),
  },
  {
    fieldName: "feel_like_exploring_things",
    text: (
      <p>
        Using the investment platform makes me feel like I am exploring things.
      </p>
    ),
  },
  {
    fieldName: "want_to_know_next",
    text: (
      <p>
        Using the investment platform makes me want to know what comes next.
      </p>
    ),
  },
];

export default function PlatformQuestionsPage() {
  const sessionId = useSurveyStore((state) => state.sessionId);
  const { toNext } = usePageNavigation({
    nextPathname: "/exit-survey-02",
  });
  const shuffledQuestions: IPageQuestion[] = useMemo(() => {
    return _.shuffle(pageQuestions);
  }, []);

  const [recordFirstExitSurveyQuestionsToDb] = useMutation(
    RECORD_FIRST_EXIT_SURVEY_QUERY
  );

  console.log(pageQuestions.map((o) => o.fieldName));

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (isValid) {
      await recordFirstExitSurveyQuestionsToDb({
        variables: {
          session_id: sessionId,
          attention_check: data["attention_check"],
          need_to_accomplish: data["need_to_accomplish"],
          strive_for_accomplishment: data["strive_for_accomplishment"],
          motivates_progress: data["motivates_progress"],
          time_pass_quickly: data["time_pass_quickly"],
          grabs_attention: data["grabs_attention"],
          lose_myself: data["lose_myself"],
          playful_experience: data["playful_experience"],
          feel_like_exploring_things: data["feel_like_exploring_things"],
          want_to_know_next: data["want_to_know_next"],
        },
      });

      toNext();
    }
  };

  return (
    <Layout>
      <main className={clsx(styles.exitSurveyFirst)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {shuffledQuestions.map((q) => (
            <div className={styles.questionWrapper}>
              <AgreementScale
                fieldName={q.fieldName}
                text={q.text}
                register={register}
              />
            </div>
          ))}

          <div
            style={{
              marginTop: "40px",
              textAlign: "right",
            }}
          >
            <input
              type="submit"
              className="button"
              value="Next"
              disabled={!isValid}
            />
          </div>
        </form>
      </main>
    </Layout>
  );
}
