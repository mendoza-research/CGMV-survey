import { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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
import { FinancialInformationEnum, GamificationEnum } from "typings/survey";

const LATEST_TREATMENT_QUERY = gql`
  query LatestTreatmentsQuery {
    cgmv_sessions(limit: 1, order_by: { start_time: desc }) {
      financial_information
      gamification
    }
  }
`;

const CREATE_CGMV_SESSION = gql`
  mutation CreateSession(
    $os: String!
    $device_type: String!
    $browser_name: String!
    $browser_version: String!
    $ip_addr: inet!
    $gamification: String!
    $financial_information: String!
    $screen_resolution: String!
  ) {
    insert_cgmv_sessions(
      objects: {
        browser_name: $browser_name
        browser_version: $browser_version
        device_type: $device_type
        os: $os
        ip_addr: $ip_addr
        gamification: $gamification
        financial_information: $financial_information
        screen_resolution: $screen_resolution
      }
    ) {
      affected_rows
      returning {
        session_id
      }
    }
  }
`;

export default function Home() {
  const [createSessionInDb] = useMutation(CREATE_CGMV_SESSION);
  const sessionId = useSurveyStore((state) => state.sessionId);
  const setSessionId = useSurveyStore((state) => state.setSessionId);
  const setGamification = useSurveyStore((state) => state.setGamification);
  const setFinancialInformation = useSurveyStore(
    (state) => state.setFinancialInformation
  );

  const {
    loading: latestTreatmentLoading,
    error: latestTreatmentError,
    data: latestTreatmentData,
  } = useQuery(LATEST_TREATMENT_QUERY);

  const initializeSurveySession = async () => {
    const res = await fetch("/api/get-ip");
    const ipData = await res.json();
    const ipAddress = ipData.status === "success" ? ipData.ip : "0.0.0.0";

    // If no other sessions have been recorded in the database, use the "first" treatment group combination
    let newGamification: GamificationEnum = GamificationEnum.GAMIFICATION;
    let newFinancialInformation: FinancialInformationEnum =
      FinancialInformationEnum.A;

    if (latestTreatmentData["cgmv_sessions"].length > 0) {
      const latestTreatmentGroups = latestTreatmentData["cgmv_sessions"][0];
      const newTreatmentGroups = getTreatmentGroups({
        gamification: latestTreatmentGroups["gamification"],
        financialInformation: latestTreatmentGroups["financial_information"],
      });

      newGamification = newTreatmentGroups.gamification;
      newFinancialInformation = newTreatmentGroups.financialInformation;
    }

    setGamification(newGamification);
    setFinancialInformation(newFinancialInformation);

    const result = await createSessionInDb({
      variables: {
        browser_name: browserName,
        browser_version: fullBrowserVersion,
        device_type: deviceType,
        os: osName,
        ip_addr: ipAddress,
        gamification: newGamification,
        financial_information: newFinancialInformation,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      },
    });

    const sessionId =
      result["data"]["insert_cgmv_sessions"]["returning"][0]["session_id"];

    setSessionId(sessionId);
  };

  const { isFirstVisit, toNext } = usePageNavigation({
    nextPathname: "/background",
  });

  useEffect(() => {
    if (typeof latestTreatmentData !== "undefined" && isFirstVisit) {
      initializeSurveySession();
    }
  }, [latestTreatmentData]);

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
