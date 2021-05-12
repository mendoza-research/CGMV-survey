import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./layout.module.scss";
import { isMobileOnly } from "react-device-detect";
import useSurveyStore from "stores/useSurveyStore";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const router = useRouter();

  const gamification = useSurveyStore((state) => state.gamification);
  const financialInformation = useSurveyStore(
    (state) => state.financialInformation
  );

  useEffect(() => {
    // Check if the user is using a mobile device (only desktops and tablets are supported)
    if (isMobileOnly) {
      router.push("/unsupported-mobile");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Survey</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* {process.env.NODE_ENV === "development" && ( */}
      <div className={styles.devBox}>
        {gamification} / {financialInformation}
      </div>
      {/* )} */}

      <div className={styles.container}>{children}</div>
    </>
  );
}
