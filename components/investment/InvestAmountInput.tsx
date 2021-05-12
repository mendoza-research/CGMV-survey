import { useEffect, useState } from "react";
import styles from "./InvestAmountInput.module.scss";
import clsx from "clsx";
import {
  formatAsCurrency,
  isValidAmountStr,
  parseAmountStr,
} from "utils/investment";

interface IInvestAmountInputProps {
  companyName: string;
  logoImage: React.ReactNode;
  amount: number;
  setAmount: (v: number) => void;
  minAmount: number;
  maxAmount: number;
}

export default function InvestAmountInput({
  companyName,
  logoImage,
  amount,
  setAmount,
  minAmount,
  maxAmount,
}: IInvestAmountInputProps) {
  const [inputVal, setInputVal] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    if (amount >= minAmount && amount <= maxAmount) {
      setIsInputValid(true);
    }
  }, [maxAmount]);

  return (
    <div className={clsx(styles.inputBox)}>
      <div className={styles.logoImageWrapper}>{logoImage}</div>

      <h2 className={styles.boxTitle}>Invest in {companyName}</h2>

      <div className={styles.amountBox}>
        <span>Amount: $</span>
        <input
          type="text"
          className={clsx({
            [styles.invalid]: !isInputValid,
          })}
          value={inputVal}
          onFocus={() => {
            if (isValidAmountStr(inputVal, minAmount, maxAmount)) {
              setInputVal(amount.toString());
            }
          }}
          onChange={(e) => {
            let cleanedAmountStr = e.target.value.replace(/[^0-9\.]/g, "");

            setInputVal(cleanedAmountStr);

            if (isValidAmountStr(cleanedAmountStr, minAmount, maxAmount)) {
              setIsInputValid(true);
            }
          }}
          onBlur={(e) => {
            let cleanedAmountStr = e.target.value.replace(/[^0-9\.]/g, "");
            let newAmount = parseAmountStr(cleanedAmountStr);

            if (cleanedAmountStr === "") {
              // If the input is blank, set as zero
              setAmount(0);
              setInputVal("0");
              setIsInputValid(true);
            } else if (newAmount > maxAmount) {
              // If the entered amount exceeds available funds,
              // set the amount to available maximum
              setAmount(maxAmount);
              setInputVal(formatAsCurrency(maxAmount, false));
            } else if (
              isValidAmountStr(cleanedAmountStr, minAmount, maxAmount)
            ) {
              // If a valid amount, proceed
              setAmount(newAmount);
              setInputVal(formatAsCurrency(newAmount, false));
            } else {
              // Treat any edge cases as zero
              setAmount(0);
              setIsInputValid(false);
            }
          }}
        />
      </div>

      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <p>
          You are buying {formatAsCurrency(amount)} of {companyName} at the
          current market price.
        </p>
      </div>
    </div>
  );
}
