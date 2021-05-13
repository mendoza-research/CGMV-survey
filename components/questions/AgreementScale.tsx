import { UseFormRegister, FieldValues } from "react-hook-form";
import styles from "./AgreementScale.module.scss";

const optionLabels = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree",
];

interface IAgreementScaleProps {
  fieldName: string;
  text: React.ReactNode;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}

export default function AgreementScale({
  fieldName,
  text,
  register,
  required,
}: IAgreementScaleProps) {
  // By default, require this question to be answered
  required = typeof required === "undefined" ? true : required;

  return (
    <div className={styles.agreementScale}>
      <div className={styles.text}>{text}</div>

      <div className={styles.optionsWrapper}>
        {optionLabels.map((v, index) => (
          <label>
            <span className={styles.labelText}>{v}</span>
            <input
              {...register(fieldName, { required })}
              type="radio"
              value={index + 1}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
