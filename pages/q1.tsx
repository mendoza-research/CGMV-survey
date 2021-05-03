import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import styles from "styles/investment.module.scss";

type FormValues = {
  response: string;
};

export default function Q1Page() {
  const { toNext } = usePageNavigation({
    nextPathname: "/q2",
  });

  const { register, watch } = useForm<FormValues>();
  const userResponse = watch().response;

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
            <button disabled={userResponse === null} onClick={toNext}>
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
