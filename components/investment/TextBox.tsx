import Layout from "components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationEnum } from "typings/animation";
import { ANIMATION_DURATION, quickFadeInOutVariants } from "survey-settings";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import { useState } from "react";
import AnimationBox from "components/animations/AnimationBox";

interface ITextBoxProps {
  children: React.ReactNode;
  toNext: () => void;
  animation?: AnimationEnum;
}

export default function TextBox({
  children,
  toNext,
  animation,
}: ITextBoxProps) {
  const gamification = useSurveyStore((state) => state.gamification);
  const shouldAnimate =
    animation && gamification === GamificationEnum.GAMIFICATION;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageExiting, setIsPageExiting] = useState(false);

  const handleNextButtonClick = async (e) => {
    e.preventDefault();

    if (shouldAnimate) {
      setIsAnimating(true);

      // Start page exit animation after ANIMATION_DURATION seconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, ANIMATION_DURATION);

      // Navigate to next page in ANIMATION_DURATION + 0.3 seconds
      // Animation is displayed for ANIMATION_DURATION seconds
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

            <div>
              {children}

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button onClick={handleNextButtonClick}>Next</button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </Layout>
  );
}
