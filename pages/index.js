import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import useSurveyStore from "stores/useSurveyStore";
import Layout from "components/Layout";
import Router from "next/dist/next-server/lib/router/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log;

    router.push("/background");
  }, []);

  return (
    <>
      <Layout>Hello World</Layout>
    </>
  );
}
