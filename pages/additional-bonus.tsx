import usePageNavigation from "hooks/usePageNavigation";
import { useState } from "react";
import useSurveyStore from "stores/useSurveyStore";
import styles from "components/stock-selections/RevealProceedsBox.module.scss";
import Layout from "components/Layout";
import { StakesEnum } from "typings/survey";
import clsx from "clsx";
import { formatAsUSD } from "utils/stock-questions";

export default function AdditionalBonusPage() {
  const nextPathname = "/exit-survey";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  const stakes = useSurveyStore((state) => state.stakes);
  const lotteryProceeds = useSurveyStore((state) => state.lotteryProceeds);
  const [didReveal, setDidReveal] = useState(false);

  const onNextButtonClick = async () => {
    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.revealBox}>
        <h2>Additional Bonus</h2>

        <div className={styles.instructionText}>
          {stakes === StakesEnum.LOW_STAKES ? (
            <p>
              Your total bonus payment from this study has two components: (1)
              the cash proceeds from your "free stock" and (2) the cash proceeds
              dictated by the lottery below. In this lottery, you have a 90%
              chance of earning $1.70 and a 10% chance of earning $3.65. Click
              the button below to reveal the amount of this second component of
              your total bonus.
            </p>
          ) : (
            <p>
              Your total bonus payment from this study has two components: (1)
              the cash proceeds from your "free stock" and (2) the cash proceeds
              dictated by the lottery below. In this lottery, you have a 90%
              chance of earning $0.10 and a 10% chance of earning $0.20. Click
              the button below to reveal the amount of this second component of
              your total bonus.
            </p>
          )}
        </div>

        <div
          onClick={() => setDidReveal(true)}
          className={clsx(styles.revealButton, styles.green, {
            [styles.didReveal]: didReveal,
          })}
        >
          {!didReveal ? (
            <>
              Reveal 2<sup>nd</sup> Component of Bonus
            </>
          ) : (
            formatAsUSD(lotteryProceeds)
          )}
        </div>

        {didReveal && (
          <div
            style={{
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <p>Click "Exit Platform" to proceed.</p>
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
            Exit Platform
          </button>
        </div>
      </main>
    </Layout>
  );
}
