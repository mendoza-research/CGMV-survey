import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.push("/background");
    }
  }, [router]);

  return (
    <>
      <Layout>Checking Device...</Layout>
    </>
  );
}
