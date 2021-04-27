import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/background");
  }, []);

  return (
    <>
      <Layout>Hello World</Layout>
    </>
  );
}
