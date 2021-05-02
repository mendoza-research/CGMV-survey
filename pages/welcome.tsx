import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import styles from "styles/investment.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

export default function WelcomePage() {
  const [canNavigate, setCanNavigate] = useState(false);

  const { toNext } = usePageNavigation("/welcome");

  return (
    <Layout>
      <main className={styles.investmentBox}>
        <div>
          <h2>Background</h2>
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
              justifyContent: "end",
            }}
          >
            <button disabled={!canNavigate}>Begin</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
