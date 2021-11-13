import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Layout from "components/Layout";
import {
  browserName,
  fullBrowserVersion,
  osName,
  deviceType,
} from "react-device-detect";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { getTreatmentGroups } from "utils/investment";
import { GamificationEnum, StakesEnum } from "typings/survey";
import {
  LATEST_TREATMENT_QUERY,
  CREATE_CGMV_SESSION_QUERY,
} from "utils/gql-queries";

export default function Home() {
  const [createSessionInDb] = useMutation(CREATE_CGMV_SESSION_QUERY);
  const sessionId = useSurveyStore((state) => state.sessionId);
  const setSessionId = useSurveyStore((state) => state.setSessionId);
  const setGamification = useSurveyStore((state) => state.setGamification);
  const setStakes = useSurveyStore((state) => state.setStakes);
  const router = useRouter();

  const nextPathname = "/recaptcha";
  const { isFirstVisit, toNext } = usePageNavigation({
    nextPathname,
  });

  const { data: latestTreatmentData } = useQuery(LATEST_TREATMENT_QUERY);

  const initializeSurveySession = async () => {
    const res = await fetch("/api/get-ip");
    const ipData = await res.json();
    const ipAddress = ipData.status === "success" ? ipData.ip : "0.0.0.0";

    // If no other sessions have been recorded in the database, use the "first" treatment group combination
    let newGamification: GamificationEnum = GamificationEnum.GAMIFICATION;
    let newStakesInformation: StakesEnum = StakesEnum.LOW_STAKES;

    // If the URL query contains Gamification and Stakes values, manually assign them
    if (
      router.query.hasOwnProperty("gamification") &&
      router.query.hasOwnProperty("stakes")
    ) {
      newGamification =
        GamificationEnum[
          router.query.gamification as keyof typeof GamificationEnum
        ];

      newStakesInformation =
        StakesEnum[router.query.stakes as keyof typeof StakesEnum];
    } else if (latestTreatmentData["cgmv_sessions"].length > 0) {
      const latestTreatmentGroups = latestTreatmentData["cgmv_sessions"][0];
      const newTreatmentGroups = getTreatmentGroups({
        gamification: latestTreatmentGroups["gamification"],
        stakes: latestTreatmentGroups["stakes"],
      });

      newGamification = newTreatmentGroups.gamification;
      newStakesInformation = newTreatmentGroups.stakes;
    }

    console.log(
      `gamification=${newGamification}, stakes=${newStakesInformation}`
    );

    setGamification(newGamification);
    setStakes(newStakesInformation);

    const result = await createSessionInDb({
      variables: {
        browser_name: browserName,
        browser_version: fullBrowserVersion,
        device_type: deviceType,
        os: osName,
        ip_addr: ipAddress,
        gamification: newGamification,
        stakes: newStakesInformation,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      },
    });

    const sessionId =
      result["data"]["insert_cgmv_sessions"]["returning"][0]["session_id"];

    setSessionId(sessionId);
  };

  useEffect(() => {
    if (
      typeof latestTreatmentData !== "undefined" &&
      isFirstVisit &&
      router.isReady
    ) {
      initializeSurveySession();
    }
  }, [latestTreatmentData, router]);

  useEffect(() => {
    if (sessionId) {
      toNext();
    }
  }, [sessionId]);

  return (
    <>
      <Layout>Creating a session...</Layout>
    </>
  );
}
