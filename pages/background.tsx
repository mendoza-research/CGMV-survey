import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";

export default function BackgroundPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/welcome",
  });

  return (
    <Layout>
      <main>
        <div>
          <p>
            <strong style={{ textDecoration: "underline" }}>
              For this study:
            </strong>{" "}
            Assume you have decided to sign up for a new investment platform
            that offers a free stock to all new users. As part of the sign-up
            process, you will first complete an investor profile and then
            respond to a series of "this or that" questions. Each "this or that"
            question will ask you to designate a preference between one of two
            possible stocks. Your answers to the "this or that" questions will
            then play a role in determining the free stock you ultimately
            receive from the platform.
          </p>

          <p>
            <strong style={{ textDecoration: "underline" }}>
              What this means for your compensation:
            </strong>{" "}
            Compensation for your participation includes both a $0.50 fixed
            payment as well as a bonus payment of up to <strong>$</strong>4.05.
            Your answers to the "this or that" questions will influence the
            stock given to you by the platform, which will ultimately influence
            your bonus payment (further details will be provided later). You
            will receive both your fixed payment and bonus payment within 24
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
