import Layout from "components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationEnum } from "typings/animation";
import { getAnimationBox, quickFadeInOutVariants } from "utils/animations";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import { useState } from "react";

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
                {getAnimationBox(animation)}
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
