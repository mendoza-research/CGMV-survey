import Layout from "components/Layout";
import Link from "next/link";
import usePageNavigation from "hooks/usePageNavigation";
import styles from "styles/investment.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

export default function WelcomePage() {
  const router = useRouter();
  const [canNavigate, setCanNavigate] = useState(true);

  usePageNavigation();

  const next = () => {
    router.push("/welcome");
  };

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

          {/* <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button disabled={!canNavigate} onClick={next}>
              Begin
            </button>
          </div> */}
        </div>
      </main>
    </Layout>
  );
}
