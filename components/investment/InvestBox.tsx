import Layout from "components/Layout";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationEnum } from "typings/animation";
import { quickFadeInOutVariants } from "survey-settings";
import clsx from "clsx";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum, FinancialInformationEnum } from "typings/survey";
import { formatAsCurrency, isValidAmountStr } from "utils/investment";
import { useState } from "react";
import AnimationBox from "components/animations/AnimationBox";

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

  const totalAvailable = 10000;
  const [soundWavesAmount, setSoundWavesAmount] = useState(0);
  const [virtuosoAmount, setVirtuosoAmount] = useState(0);

  const [soundWavesInputVal, setSoundWavesInputVal] = useState("");
  const [virtuosoInputVal, setVirtuosoInputVal] = useState("");

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();

    if (shouldAnimate) {
      setIsAnimating(true);

      // Start page exit animation after 2 seconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, 2000);

      // Navigate to next page in 2.3 seconds
      // Animation is displayed for 2 seconds
      // Exit animation takes 0.3 seconds (300 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 2300));
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
                <div className={clsx(styles.inputBox, styles.leftInputBox)}>
                  <div className={styles.logoImageWrapper}>
                    <Image
                      src="/images/Soundwaves_Logo.png"
                      alt="Sound Waves Logo"
                      width={160}
                      height={30}
                    />
                  </div>

                  <h2 className={styles.boxTitle}>
                    Invest in Sound Waves Inc.
                  </h2>

                  <div className={styles.amountBox}>
                    <span>Amount: $</span>
                    <input
                      type="text"
                      value={soundWavesInputVal}
                      onFocus={() => {
                        if (soundWavesAmount > 0) {
                          setSoundWavesInputVal(soundWavesAmount.toString());
                        }
                      }}
                      onChange={(e) => {
                        console.log(`onChange, val=${e.target.value}`);
                        setSoundWavesInputVal(e.target.value);
                      }}
                      onBlur={(e) => {
                        console.log(
                          `onBlur, e.target.value=${e.target.value}, inputVal=${soundWavesInputVal}`
                        );

                        if (
                          isValidAmountStr(e.target.value, 0, totalAvailable)
                        ) {
                          const newAmount = Number.parseFloat(e.target.value);

                          setSoundWavesAmount(newAmount);
                          setSoundWavesInputVal(
                            formatAsCurrency(newAmount, false)
                          );

                          setVirtuosoAmount(totalAvailable - newAmount);
                          setVirtuosoInputVal(
                            formatAsCurrency(totalAvailable - newAmount, false)
                          );
                        }
                      }}
                    />
                  </div>

                  <div className={styles.orderSummary}>
                    <h3>Order Summary</h3>
                    <p>
                      You are buying {formatAsCurrency(soundWavesAmount)} of
                      Sound Waves Inc. at the current market price.
                    </p>
                  </div>
                </div>

                <div className={clsx(styles.inputBox, styles.rightInputBox)}>
                  <div className={styles.logoImageWrapper}>
                    <Image
                      src="/images/Virtuoso_Logo.png"
                      alt="Virtuoso Logo"
                      width={233}
                      height={30}
                    />
                  </div>

                  <h2 className={styles.boxTitle}>Invest in Virtuoso Corp.</h2>

                  <div className={styles.amountBox}>
                    <span>Amount: $</span>
                    <input
                      type="text"
                      value={virtuosoInputVal}
                      onFocus={() => {
                        if (virtuosoAmount > 0) {
                          setVirtuosoInputVal(virtuosoAmount.toString());
                        }
                      }}
                      onChange={(e) => {
                        console.log(`onChange, val=${e.target.value}`);
                        setVirtuosoInputVal(e.target.value);
                      }}
                      onBlur={(e) => {
                        console.log(
                          `onBlur, e.target.value=${e.target.value}, inputVal=${virtuosoInputVal}`
                        );

                        if (
                          isValidAmountStr(e.target.value, 0, totalAvailable)
                        ) {
                          const newAmount = Number.parseFloat(e.target.value);

                          setVirtuosoAmount(newAmount);
                          setVirtuosoInputVal(
                            formatAsCurrency(newAmount, false)
                          );

                          setSoundWavesAmount(totalAvailable - newAmount);
                          setSoundWavesInputVal(
                            formatAsCurrency(totalAvailable - newAmount, false)
                          );
                        }
                      }}
                    />
                  </div>

                  <div className={styles.orderSummary}>
                    <h3>Order Summary</h3>
                    <p>
                      You are buying {formatAsCurrency(virtuosoAmount)} of
                      Virtuoso Corp. at the current market price.
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={handleSubmitButtonClick}
                  disabled={
                    soundWavesAmount + virtuosoAmount !== totalAvailable
                  }
                >
                  Submit Order
                </button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </Layout>
  );
}
