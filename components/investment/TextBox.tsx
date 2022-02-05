import Layout from "components/Layout";
import { AnimationEnum } from "typings/animation";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import { useState } from "react";
import AnimationBox from "components/animations/AnimationBox";
import { getAnimationDuration, getFadeInOutVariants } from "utils/animation";
import { motion, AnimatePresence } from "framer-motion";

interface ITextBoxProps {
  children: React.ReactNode;
  toNext?: () => void;
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

    if (toNext) {
      toNext();
    }
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

        <div>
          {children}

          {toNext && (
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button onClick={handleNextButtonClick}>{nextButtonText}</button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
