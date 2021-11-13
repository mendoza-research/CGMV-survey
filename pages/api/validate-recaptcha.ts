import { NextApiRequest, NextApiResponse } from "next";
import createApolloClient from "lib/apollo-client";
import { RECORD_RECAPTCHA_RESULTS } from "utils/gql-queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { sessionId, captcha } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!sessionId || !captcha) {
      return res.status(422).json({
        message:
          "Unproccesable request, please provide the required values (sessionId, captcha)",
      });
    }

    try {
      const apolloClient = createApolloClient();

      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */

      const { data } = await apolloClient.mutate({
        mutation: RECORD_RECAPTCHA_RESULTS,
        variables: {
          session_id: sessionId,
          recaptcha_result: captchaValidation.success,
          recaptcha_timestamp: captchaValidation.challenge_ts,
        },
      });

      if (captchaValidation.success) {
        // Return 200 if everything is successful
        return res.status(200).send("OK");
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: error.message });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Only POST requests are accepted");
}
