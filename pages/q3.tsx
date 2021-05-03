import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import styles from "styles/investment.module.scss";

type FormValues = {
  response: string;
};

const RECORD_SINGLE_RESPONSE = gql`
  mutation RecordQ3Response($session_id: uuid!, $response: String) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: { q3: $response }
    ) {
      session_id
    }
  }
`;

const question = {
  text:
    "What is the time frame in which you hope to achieve your primary financial goal?",
  options: ["0 - 4 Years", "5 - 9 Years", "10 Years or Longer"],
};

export default function Q3Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/q4",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const { register, watch, formState } = useForm<FormValues>({
    mode: "onChange",
  });
  const userResponse = watch("response");
  const [recordSingleResponseToDb] = useMutation(RECORD_SINGLE_RESPONSE);

  const handleNextButtonClick = async () => {
    await recordSingleResponseToDb({
      variables: {
        session_id: sessionId,
        response: userResponse,
      },
    });

    toNext();
  };

  return (
    <Layout>
      <main className={styles.investmentBox}>
        <div>
          <p>{question.text}</p>

          <div className={styles.singleQuestionForm}>
            {question.options.map((o) => (
              <label key={o} className={styles.radioLabel}>
                <input
                  {...register("response", { required: true })}
                  type="radio"
                  value={o}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              disabled={!formState.isValid}
              onClick={handleNextButtonClick}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
