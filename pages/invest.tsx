import Layout from "components/Layout";
import Image from "next/image";
import usePageNavigation from "hooks/usePageNavigation";
import { AnimationEnum } from "typings/animation";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum, FinancialInformationEnum } from "typings/survey";
import { formatAsCurrency } from "utils/investment";
import { useEffect, useState } from "react";
import AnimationBox from "components/animations/AnimationBox";
import InvestAmountInput from "components/investment/InvestAmountInput";
import clsx from "clsx";
import styles from "components/investment/investment.module.scss";
import { UPDATE_INVEST_AMOUNTS_QUERY } from "utils/gql-queries";
import { useMutation } from "@apollo/client";
import { getAnimationDuration } from "utils/animation";

const totalAvailable = 10000;
const animation = AnimationEnum.FALLING_STARS;

export default function InvestBox() {
  const { toNext } = usePageNavigation({
    nextPathname: "/order-confirmed",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification = useSurveyStore((state) => state.gamification);
  const financialInformation = useSurveyStore(
    (state) => state.financialInformation
  );
  const shouldAnimate = gamification === GamificationEnum.GAMIFICATION;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageExiting, setIsPageExiting] = useState(false);
  const [soundWavesAmount, setSoundWavesAmount] = useState(0);
  const [virtuosoAmount, setVirtuosoAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recordInvestAmountsToDb] = useMutation(UPDATE_INVEST_AMOUNTS_QUERY);

  useEffect(() => {
    if (
      errorMessage !== "" &&
      soundWavesAmount + virtuosoAmount === totalAvailable
    ) {
      setErrorMessage("");
    }
  }, [soundWavesAmount, virtuosoAmount]);

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();

    if (soundWavesAmount + virtuosoAmount !== totalAvailable) {
      setErrorMessage("Whoops! You still have funds remaining.");
      return;
    } else {
      setErrorMessage("");
    }

    await recordInvestAmountsToDb({
      variables: {
        session_id: sessionId,
        soundwaves_amount: soundWavesAmount,
        virtuoso_amount: virtuosoAmount,
      },
    });

    const animationDuration = getAnimationDuration(animation);

    if (shouldAnimate) {
      setIsAnimating(true);

      // Navigate to next page in animationDuration milliseconds
      // Animation is displayed for animationDuration milliseconds
      await new Promise((resolve) => setTimeout(resolve, animationDuration));
    }

    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.investmentBox}>
        {isAnimating && (
          <div className={styles.animationWrapper}>
            <AnimationBox animation={animation} />
          </div>
        )}

        <div className={styles.financialInformationBox}>
          <div className={styles.leftBox}>
            <Image
              src="/images/Soundwaves_Logo.png"
              alt="Sound Waves Logo"
              width={267}
              height={50}
            />

            <Image
              src="/images/Soundwaves_IS.jpg"
              alt="Sound Waves Income Statement"
              width={602}
              height={302}
            />

            <Image
              src={
                financialInformation === FinancialInformationEnum.A
                  ? "/images/Risk_2.jpg"
                  : "/images/Risk_9.jpg"
              }
              alt="Virtuoso Risk"
              width={602}
              height={296}
            />
          </div>

          <div className={styles.rightBox}>
            <Image
              src="/images/Virtuoso_Logo.png"
              alt="Virtuoso Logo"
              width={388}
              height={50}
            />

            <Image
              src="/images/Virtuoso_IS.jpg"
              alt="Virtuoso Income Statement"
              width={602}
              height={302}
            />

            <Image
              src="/images/Risk_5.jpg"
              alt="Virtuoso Risk"
              width={602}
              height={296}
            />
          </div>
        </div>

        <div className={styles.allocationBox}>
          <div className={styles.remainingText}>
            {formatAsCurrency(
              totalAvailable - soundWavesAmount - virtuosoAmount
            )}{" "}
            Remaining to Invest
          </div>

          <div className={styles.inputBoxWrapper}>
            <InvestAmountInput
              companyName="Sound Waves Inc."
              logoImage={
                <Image
                  src="/images/Soundwaves_Logo.png"
                  alt="Sound Waves Logo"
                  width={160}
                  height={30}
                />
              }
              amount={soundWavesAmount}
              setAmount={setSoundWavesAmount}
              minAmount={0}
              maxAmount={totalAvailable - virtuosoAmount}
            />

            <InvestAmountInput
              companyName="Virtuoso Corp."
              logoImage={
                <Image
                  src="/images/Virtuoso_Logo.png"
                  alt="Virtuoso Logo"
                  width={233}
                  height={30}
                />
              }
              amount={virtuosoAmount}
              setAmount={setVirtuosoAmount}
              minAmount={0}
              maxAmount={totalAvailable - soundWavesAmount}
            />
          </div>

          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <a
              className={clsx("button", {
                disabled: soundWavesAmount + virtuosoAmount !== totalAvailable,
              })}
              onClick={handleSubmitButtonClick}
            >
              Submit Order
            </a>

            {errorMessage !== "" && (
              <p
                style={{
                  marginTop: "10px",
                  color: "red",
                }}
              >
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
