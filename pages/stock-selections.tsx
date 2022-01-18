import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "components/stock-selections/stock-selections.module.scss";
import { RECORD_STOCK_SELECTIONS } from "utils/gql-queries";
import { useMutation } from "@apollo/client";
import {
  floatToPercentage,
  formatAsUSD,
  getAdditionalBonus,
  getRandomProceedsIndex,
  getStockQuestions,
} from "utils/stock-questions";
import { StakesEnum } from "typings/survey";
import random from "lodash/random";
import StockQuestionBox from "components/stock-selections/StockQuestionItem";

export default function InvestBox() {
  const nextPathname = "/free-stock";
  const { toNext } = usePageNavigation({
    nextPathname,
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const stakes = useSurveyStore((state) => state.stakes);
  const setFreeStock = useSurveyStore((state) => state.setFreeStock);
  const setStockProceeds = useSurveyStore((state) => state.setStockProceeds);
  const setLotteryProceeds = useSurveyStore(
    (state) => state.setLotteryProceeds
  );

  const [recordStockSelectionsToDb] = useMutation(RECORD_STOCK_SELECTIONS);

  // 0 for "This" stock, 1 for "That" stock
  const [stockSelections, setStockSelections] = useState<Array<number>>(
    new Array(10).fill(-1)
  );

  // Get stock questions based on the participant's stakes condition (low vs high)
  const stockQuestions = getStockQuestions(stakes);

  const isIncomplete = stockSelections.some((o) => o < 0);

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();

    if (isIncomplete) {
      return;
    }

    // Pick a random stock index between 0 to 9
    // 0 and 9 are inclusive with Lodash's _.random()
    const freeStockIndex = random(0, 9);
    const userSelectionIndex = stockSelections[freeStockIndex];
    const freeStock =
      stockQuestions[freeStockIndex][
        userSelectionIndex === 0 ? "thisStock" : "thatStock"
      ];

    // Randomly pick cash proceeds index based on weighted probabilities of each proceed
    const cashProceedsIndex: number = getRandomProceedsIndex(freeStock);
    const proceeds = freeStock[cashProceedsIndex];
    const lotteryProceeds = getAdditionalBonus(stakes);

    // A human-readable string of free stock and proceeds information
    // Example: q8_that (20% chance of $0.01 cash proceeds)
    const freeStockStr = `q${freeStockIndex + 1}_${
      userSelectionIndex === 0 ? "this" : "that"
    } (${floatToPercentage(proceeds.probability)} chance of ${formatAsUSD(
      proceeds.proceeds
    )} cash proceeds)`;

    const saveVariables = {
      session_id: sessionId,
      free_stock: freeStockStr,
      stock_proceeds: proceeds.proceeds,
      lottery_proceeds: lotteryProceeds,
    };

    setFreeStock(freeStock);
    setStockProceeds(proceeds.proceeds);
    setLotteryProceeds(lotteryProceeds);

    stockSelections.forEach((val, index) => {
      saveVariables[`stock_q${index + 1}`] = val;
    });

    // console.log(JSON.stringify(saveVariables, null, 2));

    await recordStockSelectionsToDb({
      variables: saveVariables,
    });

    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.stockSelectionsBox}>

        <div className={styles.instructionText}>
          <h2
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            Free Stock
          </h2>
          {stakes === StakesEnum.LOW_STAKES ? (
            <p style={{ marginTop: "0.5rem" }}>
              For each question listed below, pick either "This Stock" or "That
              Stock" to indicate which stock you are most interested in
              receiving. The percentages indicate the probability the stock will
              be worth the corresponding dollar amount at the time it is sold.
              For example, in Q1, the stock labeled "
              <span style={{ textDecoration: "underline" }}>This Stock</span>"
              has a 10% chance of being worth $0.21 and a 90% chance of being
              worth $0.17. After you submit your picks, one of the ten stocks
              you pick will be chosen at random and then "sold." The cash
              proceeds dictated by the sale of the chosen stock is the 
              <strong> <u>smaller</u></strong> component of your total bonus payment.
            </p>
          ) : (
            <p>
              For each question listed below, pick either "This Stock" or "That
              Stock" to indicate which stock you are most interested in
              receiving. The percentages indicate the probability the stock will
              be worth the corresponding dollar amount at the time it is sold.
              For example, in Q1, the stock labeled "
              <span style={{ textDecoration: "underline" }}>This Stock</span>"
              has a 10% chance of being worth $2.00 and a 90% chance of being
              worth $1.60. After you submit your picks, one of the ten stocks
              you pick will be chosen at random and then "sold." The cash
              proceeds dictated by the sale of the chosen stock is the <strong><u>
              larger</u></strong> component of your total bonus payment.
            </p>
          )}
        </div>
        
        <div
          style={{
            width: "300px",
          }}
        >
          {stakes === StakesEnum.HIGH_STAKES ? (
            <Image
              src="/images/high_stakes_bonus_Free_Stock_pg.png"
              width={705}
              height={669}
              layout="responsive"
              alt=""
            />
          ) : (
            <Image
              src="/images/low_stakes_bonus_Free_Stock_pg.png"
              width={706}
              height={669}
              layout="responsive"
              alt=""
            />
          )}
        </div>

        <div className={styles.stockQuestionsWrapper}>
          {stockQuestions.map((stockQuestion, qIndex) => (
            <StockQuestionBox
              key={qIndex}
              title={`Q${qIndex + 1}`}
              stockQuestion={stockQuestion}
              selectedIndex={stockSelections[qIndex]}
              setSelectedIndex={(selectedIndex) => {
                setStockSelections((prevSelections) => {
                  const newSelections = [...prevSelections];
                  newSelections[qIndex] = selectedIndex;
                  return newSelections;
                });
              }}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            borderTop: "4px solid #111",
            width: "100%",
          }}
        >
          <p>
            {isIncomplete
              ? "Please complete all questions to submit."
              : 'To confirm your picks, please click "Submit".'}
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            textAlign: "right",
            width: "100%",
          }}
        >
          <a
            className={clsx("button", {
              disabled: isIncomplete,
            })}
            onClick={handleSubmitButtonClick}
          >
            Submit
          </a>
        </div>
      </main>
    </Layout>
  );
}
