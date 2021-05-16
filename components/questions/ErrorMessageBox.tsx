import styles from "./ErrorMessageBox.module.scss";

interface IErrorMessageBoxProps {
  message?: string;
}

export default function ErrorMessageBox({ message }: IErrorMessageBoxProps) {
  message = message ? message : "This field is required.";

  return (
    <div className={styles.errorMessageBox}>
      <p>{message}</p>
    </div>
  );
}
