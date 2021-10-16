import usePageNavigation from "hooks/usePageNavigation";
import { useState } from "react";
import useSurveyStore from "stores/useSurveyStore";
import styles from "components/stock-selections/RevealProceedsBox.module.scss";
import Layout from "components/Layout";
import clsx from "clsx";
import { Proceeds } from "components/stock-selections/StockQuestionItem";
import { formatAsUSD } from "utils/stock-questions";

export default function FreeStockPage() {
  const nextPathname = "/additional-bonus";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  const freeStock = useSurveyStore((state) => state.freeStock);
  const stockProceeds = useSurveyStore((state) => state.stockProceeds);
  const [didReveal, setDidReveal] = useState(false);

  const onNextButtonClick = async () => {
    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.revealBox}>
        <h2>Your Free Stock</h2>

        <div className={styles.instructionText}>
          <p>
            Your free stock has been randomly chosen from the 10 stocks that you
            picked. The cash proceeds dictated by the sale of your stock will be
            added to your total payment. Click the button below to reveal the
            cash proceeds from your free stock.
          </p>
        </div>

        <h3>Your Free Stock</h3>
        <div className={styles.stockBox}>
          {freeStock && (
            <>
              <Proceeds proceeds={freeStock[0]} />
              <div className={styles.proceedsDivider}>and</div>
              <Proceeds proceeds={freeStock[1]} />
            </>
          )}
        </div>

        <div
          onClick={() => setDidReveal(true)}
          className={clsx(styles.revealButton, styles.blue, {
            [styles.didReveal]: didReveal,
          })}
        >
          {!didReveal ? "Reveal Cash Proceeds" : formatAsUSD(stockProceeds)}
        </div>

        {didReveal && (
          <div
            style={{
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <p>Click "Next" to proceed.</p>
          </div>
        )}

        <div
          style={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button disabled={!didReveal} onClick={onNextButtonClick}>
            Next
          </button>
        </div>
      </main>
    </Layout>
  );
}
