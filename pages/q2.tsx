import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { Gamification } from "typings/survey";
import { useForm } from "react-hook-form";
import styles from "styles/investment.module.scss";

type FormValues = {
  Response: string;
};

export default function Q1Page() {
  const gamification = useSurveyStore((state) => state.gamification);

  const { toNext } = usePageNavigation({
    nextPathname: "/q2",
  });

  const { register, watch } = useForm();
  const userResponse = watch().Response;

  console.log(`userResponse=${userResponse}`);

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
                {...register("Response", { required: true })}
                type="radio"
                value="Most concerned about my investment losing value."
              />
              <span>Most concerned about my investment losing value.</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                {...register("Response", { required: true })}
                type="radio"
                value="Equally concerned about my investment losing or gaining value."
              />
              <span>
                Equally concerned about my investment losing or gaining value.
              </span>
            </label>

            <label className={styles.radioLabel}>
              <input
                {...register("Response", { required: true })}
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
            <button disabled={userResponse !== null} onClick={toNext}>
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
