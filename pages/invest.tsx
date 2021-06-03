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
import { getAnimationDuration, getFadeInOutVariants } from "utils/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const totalAvailable = 10000;
const animation = AnimationEnum.FALLING_STARS;

export default function InvestBox() {
  const nextPathname = "/order-confirmed";
  const { toNext } = usePageNavigation({
    nextPathname,
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
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextPathname);
  }, []);

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

      // Start page exit animation after animationDuration milliseconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, animationDuration);

      await new Promise((resolve) =>
        setTimeout(resolve, animationDuration + 300)
      );
    }

    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.investmentBox}>
        {isAnimating && (
          <AnimatePresence>
            {!isPageExiting && (
              <motion.div
                key="gameAnimation"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={getFadeInOutVariants(shouldAnimate)}
                className={styles.animationWrapper}
              >
                <AnimationBox animation={animation} />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <div className={styles.financialInformationBox}>
          <Image
            src={
              financialInformation === FinancialInformationEnum.A
                ? "/images/invest_low_risk.jpg"
                : "/images/invest_high_risk.jpg"
            }
            alt="Virtuoso Risk"
            width={1280}
            height={950}
          />
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
