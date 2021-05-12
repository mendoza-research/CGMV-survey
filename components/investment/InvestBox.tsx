import Layout from "components/Layout";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationEnum } from "typings/animation";
import { ANIMATION_DURATION, quickFadeInOutVariants } from "survey-settings";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum, FinancialInformationEnum } from "typings/survey";
import { formatAsCurrency } from "utils/investment";
import { useEffect, useState } from "react";
import AnimationBox from "components/animations/AnimationBox";
import InvestAmountInput from "./InvestAmountInput";
import clsx from "clsx";

const totalAvailable = 10000;
interface IInvestBoxProps {
  toNext: () => void;
  animation?: AnimationEnum;
}

export default function InvestBox({ toNext, animation }: IInvestBoxProps) {
  const gamification = useSurveyStore((state) => state.gamification);
  const financialInformation = useSurveyStore(
    (state) => state.financialInformation
  );
  const shouldAnimate =
    animation && gamification === GamificationEnum.GAMIFICATION;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageExiting, setIsPageExiting] = useState(false);
  const [soundWavesAmount, setSoundWavesAmount] = useState(0);
  const [virtuosoAmount, setVirtuosoAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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

    if (shouldAnimate) {
      setIsAnimating(true);

      // Start page exit animation after ANIMATION_DURATION milliseconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, ANIMATION_DURATION);

      // Navigate to next page in ANIMATION_DURATION + 0.3 seconds
      // Animation is displayed for ANIMATION_DURATION milliseconds
      // Exit animation takes 0.3 seconds (300 milliseconds)
      await new Promise((resolve) =>
        setTimeout(resolve, ANIMATION_DURATION + 300)
      );
    }

    toNext();
  };

  return (
    <Layout>
      <AnimatePresence>
        {!isPageExiting && (
          <motion.main
            key="main"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quickFadeInOutVariants}
            className={styles.investmentBox}
          >
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
                    disabled:
                      soundWavesAmount + virtuosoAmount !== totalAvailable,
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
          </motion.main>
        )}
      </AnimatePresence>
    </Layout>
  );
}
