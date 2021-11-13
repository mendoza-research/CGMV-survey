import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "components/Layout";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";

export default function BotCheckPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/background",
  });
  const sessionId = useSurveyStore((state) => state.sessionId);

  const [isValidated, setIsValidated] = useState(false);

  const onCaptchaValueChange = async (captchaCode) => {
    console.log("Captcha value: ", captchaCode);
    if (!captchaCode) {
      setIsValidated(false);
      return;
    }

    try {
      const response = await fetch("/api/validate-recaptcha", {
        method: "POST",
        body: JSON.stringify({ sessionId, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsValidated(true);
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    }
  };

  const onCaptchaExpired = () => {
    setIsValidated(false);
  };

  return (
    <Layout>
      <main>
        <div>
          <p>
            Thank you for agreeing to take our study. Please click next to
            begin.
          </p>

          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onCaptchaValueChange}
              onExpired={onCaptchaExpired}
            />
          </div>

          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <button disabled={!isValidated} onClick={toNext}>
              {isValidated ? "Next" : "Check the box above"}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
