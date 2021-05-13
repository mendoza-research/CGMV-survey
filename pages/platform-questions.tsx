import Layout from "components/Layout";
import Image from "next/image";
import styles from "components/investment/investment.module.scss";
import useSurveyStore from "stores/useSurveyStore";
import { useForm } from "react-hook-form";
import usePageNavigation from "hooks/usePageNavigation";
import clsx from "clsx";
import AgreementScale from "components/questions/AgreementScale";
import { useMutation } from "@apollo/client";
import { RECORD_PLATFORM_QUESTIONS_QUERY } from "utils/gql-queries";
import _ from "lodash";
import { useMemo } from "react";

interface RiskRecollectionOption {
  value: string;
  imagePath: string;
  imageWidth: number;
  imageHeight: number;
}

export default function PlatformQuestionsPage() {
  const sessionId = useSurveyStore((state) => state.sessionId);
  const { toNext } = usePageNavigation({
    nextPathname: "/exit-survey-01",
  });
  const [recordPlatformQuestionsToDb] = useMutation(
    RECORD_PLATFORM_QUESTIONS_QUERY
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const risk_recollection = watch("risk_recollection");

  const onSubmit = async (data) => {
    if (isValid) {
      await recordPlatformQuestionsToDb({
        variables: {
          session_id: sessionId,
          risk_recollection: data["risk_recollection"],
          overall_experience: data["overall_experience"],
        },
      });

      toNext();
    }
  };

  const riskRecollectionOptions = [
    <label
      key="financial-information-A"
      className={clsx({
        [styles.selected]: risk_recollection === "A",
      })}
    >
      <input
        {...register("risk_recollection", { required: true })}
        type="radio"
        value="A"
      />
      <Image
        src="/images/financial_information_A.png"
        width={900}
        height={280}
      />
    </label>,
    <label
      key="financial-information-B"
      className={clsx({
        [styles.selected]: risk_recollection === "B",
      })}
    >
      <input
        {...register("risk_recollection", { required: true })}
        type="radio"
        value="B"
      />
      <Image
        src="/images/financial_information_B.png"
        width={900}
        height={289}
      />
    </label>,
  ];

  const shuffledRiskRecollectionOptions = useMemo(() => {
    return _.shuffle(riskRecollectionOptions);
  }, []);

  return (
    <Layout>
      <main className={clsx(styles.investmentBox, styles.platformQuestions)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            Please answer two questions to help us improve this investment
            platform.
          </p>

          <h2>Presentation of Investment Information</h2>

          <p>
            Please indicate your recollection of the risk potential for Sound
            Waves and Virtuoso:
          </p>

          {shuffledRiskRecollectionOptions}

          <h2>Overall Experience</h2>

          <AgreementScale
            fieldName="overall_experience"
            text={
              <>
                <p style={{ fontStyle: "italic" }}>
                  Please indicate your agreement with the following statement.
                </p>

                <p>
                  Based on my experience with this investment platform, I am
                  more likely to seek out additional investment opportunities.
                </p>
              </>
            }
            register={register}
          />

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <input
              type="submit"
              className="button"
              value="Exit Investment Platform"
              disabled={!isValid}
            />
          </div>
        </form>
      </main>
    </Layout>
  );
}
