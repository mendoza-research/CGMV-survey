import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Layout from "components/Layout";
import { browserName } from "react-device-detect";

const CGMV_SESSIONS = gql`
  query MyQuery {
    cmgv_session {
      session_id
      browser_type
    }
  }
`;

const CREATE_CGMV_SESSION = gql`
  mutation CreateSession($browser_type: String!) {
    insert_cmgv_session(objects: { browser_type: $browser_type }) {
      affected_rows
      returning {
        session_id
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();

  const { loading, error, data } = useQuery(CGMV_SESSIONS);
  const [createSession] = useMutation(CREATE_CGMV_SESSION);

  useEffect(() => {
    // if (router.isReady) {
    //   router.push("/background");
    // }
    createSession({
      variables: {
        browser_type: browserName,
      },
    });
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Layout>
        Checking Device...
        <p>{JSON.stringify(data)}</p>
      </Layout>
    </>
  );
}
