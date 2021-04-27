import Layout from "components/Layout";
import Link from "next/link";
import usePageNavigation from "hooks/usePageNavigation";

export default function WelcomePage() {
  usePageNavigation();

  return (
    <Layout>
      <main>
        <div>
          <h2>Background</h2>
          <p>
            For this study, assume you have just received a $10,000 cash
            inheritance from a distant relative, and you have decided to use
            this inheritance to invest in the electronics industry. You turn to
            a new investment platform to research opportunities in the industry
            and to make investments. In the next ten minutes, you will:
          </p>

          <ol>
            <li>Complete an investor profile for the platform.</li>
            <li>
              Review financial information about Sound Waves Inc. and Virtuoso
              Corp., the two companies in the electronics industry you have
              decided you are most interested in investing in.
            </li>
            <li>
              Allocate your $10,000 inheritance between the two companies’
              stocks.
            </li>
            <li>Answer a number of follow-up questions.</li>
          </ol>

          <p>
            Click the button below to begin the study by entering the investment
            platform.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/">
              <button>Enter Investment Platform</button>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
