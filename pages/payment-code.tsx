import Layout from "components/Layout";
import useSurveyStore from "stores/useSurveyStore";

export default function PaymentCodePage() {
  const getPaymentCode = useSurveyStore((state) => state.getPaymentCode);
  const paymentCode = getPaymentCode();

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
              fontSize: "3rem",
              padding: "4px 8px",
            }}
          >
            {paymentCode ? paymentCode : "Error generating payment code"}
          </span>
        </p>
      </main>
    </Layout>
  );
}
