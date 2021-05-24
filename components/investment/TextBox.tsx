import Layout from "components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationEnum } from "typings/animation";
import { quickFadeInOutVariants } from "survey-settings";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import { useState } from "react";
import AnimationBox from "components/animations/AnimationBox";
import { getAnimationDuration } from "utils/animation";

interface ITextBoxProps {
  children: React.ReactNode;
  toNext: () => void;
  animation?: AnimationEnum;
  nextButtonText?: string;
}

export default function TextBox({
  children,
  toNext,
  animation,
  nextButtonText,
}: ITextBoxProps) {
  const gamification = useSurveyStore((state) => state.gamification);
  const shouldAnimate =
    animation && gamification === GamificationEnum.GAMIFICATION;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageExiting, setIsPageExiting] = useState(false);

  nextButtonText = nextButtonText ? nextButtonText : "Next";

  const handleNextButtonClick = async (e) => {
    e.preventDefault();

    if (shouldAnimate) {
      setIsAnimating(true);

      const animationDuration = getAnimationDuration(animation);

      // Start page exit animation after animationDuration milliseconds
      setTimeout(() => {
        setIsPageExiting(true);
      }, animationDuration);

      // Navigate to next page in animationDuration + 0.3 seconds
      // Animation is displayed for animationDuration milliseconds
      // Exit animation takes 0.3 seconds (300 milliseconds)
      await new Promise((resolve) =>
        setTimeout(resolve, animationDuration + 300)
      );
    } else {
      setIsPageExiting(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
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
                <button onClick={handleNextButtonClick}>
                  {nextButtonText}
                </button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </Layout>
  );
}
