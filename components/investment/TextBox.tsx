import Layout from "components/Layout";
import { AnimationEnum } from "typings/animation";
import styles from "./investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import { useEffect, useState } from "react";
import AnimationBox from "components/animations/AnimationBox";
import { getAnimationDuration, getFadeInOutVariants } from "utils/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface ITextBoxProps {
  children: React.ReactNode;
  prefetchUrl?: string;
  toNext: () => void;
  animation?: AnimationEnum;
  nextButtonText?: string;
}

export default function TextBox({
  children,
  prefetchUrl,
  toNext,
  animation,
  nextButtonText,
}: ITextBoxProps) {
  const gamification = useSurveyStore((state) => state.gamification);
  const shouldAnimate =
    animation && gamification === GamificationEnum.GAMIFICATION;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageExiting, setIsPageExiting] = useState(false);
  const router = useRouter();

  nextButtonText = nextButtonText ? nextButtonText : "Next";

  useEffect(() => {
    if (prefetchUrl) {
      router.prefetch(prefetchUrl);
    }
  }, []);

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

        <div>
          {children}

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={handleNextButtonClick}>{nextButtonText}</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
