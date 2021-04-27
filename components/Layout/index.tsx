import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./layout.module.scss";
import { isMobileOnly } from "react-device-detect";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is using a mobile device (only desktops and tablets are supported)
    if (isMobileOnly) {
      router.push("/unsupported-mobile");
    }
  });

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>

      <div className={styles.container}>{children}</div>
    </>
  );
}
