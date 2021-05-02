import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Layout from "components/Layout";
import {
  browserName,
  fullBrowserVersion,
  osName,
  deviceType,
} from "react-device-detect";

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
  const router = useRouter();
  const [createSession] = useMutation(CREATE_CGMV_SESSION);

  const recordUserInformation = async () => {
    const res = await fetch("http://ip-api.com/json");
    const ipData = await res.json();

    createSession({
      variables: {
        browser_name: browserName,
        browser_version: fullBrowserVersion,
        device_type: deviceType,
        os: osName,
        ip_addr: ipData.query,
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      recordUserInformation();
    }
  }, [router]);

  return (
    <>
      <Layout>Creating a session...</Layout>
    </>
  );
}
