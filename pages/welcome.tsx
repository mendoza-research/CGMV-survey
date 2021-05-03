import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import styles from "styles/investment.module.scss";
import { useState } from "react";

export default function WelcomePage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/welcome",
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
            <button>Begin</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
