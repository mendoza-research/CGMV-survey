import Layout from "components/Layout";
import Image from "next/image";
import usePageNavigation from "hooks/usePageNavigation";
import { AnimationEnum } from "typings/animation";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum, StakesEnum } from "typings/survey";
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "components/investment/investment.module.scss";
import { UPDATE_INVEST_AMOUNTS_QUERY } from "utils/gql-queries";
import { useMutation } from "@apollo/client";

const totalAvailable = 10000;
const animation = AnimationEnum.FALLING_STARS;

export default function InvestBox() {
  const nextPathname = "/order-confirmed";
  const { toNext } = usePageNavigation({
    nextPathname,
  });
  const sessionId = useSurveyStore((state) => state.sessionId);
  const gamification = useSurveyStore((state) => state.gamification);
  const stakes = useSurveyStore((state) => state.stakes);
  const shouldAnimate = gamification === GamificationEnum.GAMIFICATION;
  const [errorMessage, setErrorMessage] = useState("");
  const [recordInvestAmountsToDb] = useMutation(UPDATE_INVEST_AMOUNTS_QUERY);

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();

    if (false) {
      setErrorMessage("Whoops! You still have funds remaining.");
      return;
    } else {
      setErrorMessage("");
    }

    toNext();
  };

  return (
    <Layout>
      <main key="main" className={styles.investmentBox}>
        <div className={styles.financialInformationBox}>
          Stock question options here
        </div>

        <div className={styles.allocationBox}>
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <a
              className={clsx("button", {
                disabled: false,
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
