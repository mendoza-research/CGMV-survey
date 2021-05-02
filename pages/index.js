import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Layout from "components/Layout";
import {
  browserName,
  fullBrowserVersion,
  osName,
  deviceType,
} from "react-device-detect";
import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";

const CREATE_CGMV_SESSION = gql`
  mutation CreateSession(
    $os: String!
    $device_type: String!
    $browser_name: String!
    $browser_version: String!
    $ip_addr: inet!
  ) {
    insert_cgmv_sessions(
      objects: {
        browser_name: $browser_name
        browser_version: $browser_version
        device_type: $device_type
        os: $os
        ip_addr: $ip_addr
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
  const setSessionId = useSurveyStore((state) => state.setSessionId);

  const initializeSurveySession = async () => {
    const res = await fetch("http://ip-api.com/json");
    const ipData = await res.json();

    const result = await createSessionInDb({
      variables: {
        browser_name: browserName,
        browser_version: fullBrowserVersion,
        device_type: deviceType,
        os: osName,
        ip_addr: ipData.query,
      },
    });

    const sessionId =
      result["data"]["insert_cgmv_sessions"]["returning"][0]["session_id"];

    setSessionId(sessionId);
  };

  const { isFirstVisit, toNext } = usePageNavigation({
    nextPathname: "/background",
  });

  const onFirstVisit = async () => {
    await initializeSurveySession();
    toNext();
  };

  useEffect(() => {
    if (isFirstVisit) {
      onFirstVisit();
    }
  });

  return (
    <>
      <Layout>Creating a session...</Layout>
    </>
  );
}
