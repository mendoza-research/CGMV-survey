import { useState } from "react";
import { useMutation } from "@apollo/client";
import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { RECORD_TOTAL_PAYMENT_PAGE_QUERY } from "utils/gql-queries";
import { formatAsUSD } from "utils/stock-questions";

const CurrencyCellText = ({ amount }: { amount: number }) => (
  <span style={{ padding: "0 2.5rem" }}>{formatAsUSD(amount)}</span>
);

export default function TotalPaymentPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/payment-code",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const getPaymentCode = useSurveyStore((state) => state.getPaymentCode);
  const fixedPayment = 0.5;
  const stockProceeds = useSurveyStore((state) => state.stockProceeds);
  const lotteryProceeds = useSurveyStore((state) => state.lotteryProceeds);
  const totalPayment = fixedPayment + stockProceeds + lotteryProceeds;

  const paymentCode = getPaymentCode();
  const [finalThoughts, setFinalThoughts] = useState("");
  const [recordTotalPaymentPageToDb] = useMutation(
    RECORD_TOTAL_PAYMENT_PAGE_QUERY
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await recordTotalPaymentPageToDb({
        variables: {
          session_id: sessionId,
          final_thoughts: finalThoughts,
          payment_code: paymentCode,
          total_payment: totalPayment,
        },
      });
    } catch (ex) {
      console.error(ex);
    }

    toNext();
  };

  return (
    <Layout>
      <main
        style={{
          width: 800,
          display: "block",
        }}
      >
        <div>
          <p>
            Thank you for your participation. Within the next 24 hours, you will
            receive the following:
          </p>

          <table
            style={{
              fontSize: "0.9em",
              paddingLeft: "1rem",
              marginTop: "2rem",
              borderSpacing: "4px",
              borderCollapse: "separate",
            }}
          >
            <tbody>
              <tr>
                <td>Fixed participation payment</td>
                <td>
                  <CurrencyCellText amount={fixedPayment} />
                </td>
              </tr>
              <tr>
                <td>Bonus component 1: Cash proceeds from stock</td>
                <td>
                  <CurrencyCellText amount={stockProceeds} />
                </td>
              </tr>
              <tr>
                <td>Bonus component 2: Cash proceeds from lottery</td>
                <td>
                  <CurrencyCellText amount={lotteryProceeds} />
                </td>
              </tr>
            </tbody>
            <tfoot style={{ fontWeight: 700 }}>
              <tr>
                <td style={{ borderTop: "2px solid transparent" }}>
                  Total Payment
                </td>
                <td style={{ borderTop: "2px solid #111" }}>
                  <CurrencyCellText amount={totalPayment} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <p>
            <strong>
              Please use the space below to share any thoughts you may have
              about this study. Any insights you provide will be extremely
              valuable.
            </strong>{" "}
            (No response required)
            <textarea
              style={{
                marginTop: 10,
                width: "100%",
                height: "200px",
              }}
              value={finalThoughts}
              onChange={(e) => setFinalThoughts(e.target.value)}
            />
          </p>

          <p>
            Click 'Finish' to exit this study and receive your unique completion
            code.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <a className="button" onClick={onSubmit}>
              Finish
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
