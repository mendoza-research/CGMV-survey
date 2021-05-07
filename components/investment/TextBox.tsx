import Layout from "components/Layout";
import styles from "./investment.module.scss";

interface ITextBoxProps {
  children: React.ReactNode;
  toNext: () => void;
}

export default function TextBox({ children, toNext }: ITextBoxProps) {
  return (
    <Layout>
      <main className={styles.investmentBox}>
        <div>
          {children}

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={toNext}>Next</button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
