import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import Image from "next/image";
import useSurveyStore from "stores/useSurveyStore";
import { FinancialInformationEnum } from "typings/survey";
import styles from "components/investment/investment.module.scss";

export default function FinancialInformationPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/invest",
  });

  const financialInformation = useSurveyStore(
    (state) => state.financialInformation
  );

  return (
    <TextBox toNext={toNext}>
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
    </TextBox>
  );
}
