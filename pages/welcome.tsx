import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { Gamification } from "typings/survey";
import styles from "styles/investment.module.scss";

export default function WelcomePage() {
  const gamification = useSurveyStore((state) => state.gamification);
  const nextPathname =
    gamification === Gamification.GAMIFICATION ? "/q1" : "/q1";

  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <Layout>
      <main className={styles.investmentBox}>
        <div>
          <p>
            Welcome – thank you for funding your account and for your interest
            in Sound Waves Inc. and Virtuoso Corp.! Before you can access more
            information about these companies and make investment decisions,
            please complete your investor profile.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={toNext}>Next</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
