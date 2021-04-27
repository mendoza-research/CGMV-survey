import Head from "next/head";
import styles from "./layout.module.scss";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>

      <div className={styles.container}>{children}</div>
    </>
  );
}
