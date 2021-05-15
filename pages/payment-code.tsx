import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import { useEffect } from "react";
import useSurveyStore from "stores/useSurveyStore";

export default function BackgroundPage() {
  const sessionId = useSurveyStore((state) => state.sessionId);

  return (
    <Layout>
      <main style={{ height: 800 }}>
        <p>
          Thank you for your participation! Please use the following code to
          receive payment for your work:
        </p>

        <p style={{ textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "#eee",
              fontSize: "2rem",
              padding: "4px 8px",
            }}
          >
            {sessionId.substring(0, 6)}
          </span>
        </p>
      </main>
    </Layout>
  );
}
