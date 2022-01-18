import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import Image from "next/image";
import useSurveyStore from "stores/useSurveyStore";
import { StakesEnum } from "typings/survey";

export default function BackgroundPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/welcome",
  });

  const stakes = useSurveyStore((state) => state.stakes);

  return (
    <Layout>
      <main>
        <div>
          <p>
            <strong style={{ textDecoration: "underline" }}>
              For this study:
            </strong>{" "}
            Assume you have decided to sign up for a new investment platform
            that offers new users a sign-up bonus worth up to $4.05. As part of
            the sign-up process, you will first complete an investor profile and
            then answer a series of questions that will affect the amount of
            your sign-up bonus.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <p style={{ marginTop: 0 }}>
              <strong style={{ textDecoration: "underline" }}>
                Bonus Components:
              </strong>{" "}
              <ol style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                <li>
                  <strong>Free stock</strong> – You will respond to a series of
                  "this or that" questions. For each question, you will
                  designate a preference between one of two possible stocks.
                  Your answers will help determine which free stock you
                  ultimately receive.
                </li>

                <li>
                  <strong>Lottery payout</strong> – After you answer the "this
                  or that" questions, you will participate in a free lottery.
                  The outcome of this lottery determines the amount of your
                  lottery payout.
                </li>
              </ol>
            </p>

            <div
              style={{
                width: "260px",
                minWidth: "260px",
                marginLeft: "1.5rem",
                flex: 1,
              }}
            >
              {stakes === StakesEnum.HIGH_STAKES ? (
                <Image
                  src="/images/high_stakes_bonus.png"
                  width={705}
                  height={669}
                  layout="responsive"
                  alt=""
                />
              ) : (
                <Image
                  src="/images/low_stakes_bonus.png"
                  width={706}
                  height={669}
                  layout="responsive"
                  alt=""
                />
              )}
            </div>
          </div>
          <p>
            <strong style={{ textDecoration: "underline" }}>
              What this means for your compensation:
            </strong>{" "}
            The amount of your total compensation will be presented once you
            finish the lottery and answer some demographic questions. Your
            compensation includes a $0.50 fixed payment and a bonus payment
            equal to the sum of the value of your free stock and lottery payout.
            You will receive your fixed payment and bonus payment within 24
            hours of completing the study.
          </p>


          <p>
            <strong style={{ textDecoration: "underline" }}>
              To summarize:
            </strong>{" "}
            In the next ten minutes, you will:
          </p>

          <ol>
            <li>
              Complete an investor profile within the investment platform.
            </li>
            <li>
              Answer a series of "this or that" questions that influence the
              free stock given to you by the platform. The free stock you
              receive will affect your bonus payment.
            </li>
            <li>Answer several follow-up questions outside of the platform.</li>
            <li>
              Complete the study and receive information about the bonus you
              earned.
            </li>
          </ol>

          <p>
            Click the button below to begin the study by entering the investment
            platform.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={toNext}>Enter Investment Platform</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
