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
  mutation RecordQ1Response($session_id: uuid!, $response: String) {
    update_cgmv_sessions_by_pk(
      pk_columns: { session_id: $session_id }
      _set: { q1: $response }
    ) {
      session_id
    }
  }
`;

export default function Q1Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/q2",
  });

  const sessionId = useSurveyStore((state) => state.sessionId);

  const { register, watch } = useForm<FormValues>();
  const userResponse = watch().response;
  const [recordSingleResponseToDb] = useMutation(RECORD_SINGLE_RESPONSE);

  const handleNextButtonClick = async () => {
    const result = await recordSingleResponseToDb({
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
          <p>
            What is the time frame in which you hope to achieve your primary
            financial goal?
          </p>

          <div className={styles.singleQuestionForm}>
            <label className={styles.radioLabel}>
              <input
                {...register("response", { required: true })}
                type="radio"
                value="Most concerned about my investment losing value."
              />
              <span>Most concerned about my investment losing value.</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                {...register("response", { required: true })}
                type="radio"
                value="Equally concerned about my investment losing or gaining value."
              />
              <span>
                Equally concerned about my investment losing or gaining value.
              </span>
            </label>

            <label className={styles.radioLabel}>
              <input
                {...register("response", { required: true })}
                type="radio"
                value="Most concerned about my investment gaining value."
              />
              <span>Most concerned about my investment gaining value.</span>
            </label>
          </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              disabled={userResponse === null}
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
