import { FinancialInformationEnum, GamificationEnum } from "typings/survey";
import _ from "lodash";

interface ITreatmentGroups {
  gamification: GamificationEnum;
  financialInformation: FinancialInformationEnum;
}

// Participants are assigned to different treatment groups sequentially
export function getTreatmentGroups(prevTreatmentGroups: ITreatmentGroups) {
  const assignSequence: ITreatmentGroups[] = [
    {
      gamification: GamificationEnum.GAMIFICATION,
      financialInformation: FinancialInformationEnum.A,
    },
    {
      gamification: GamificationEnum.GAMIFICATION,
      financialInformation: FinancialInformationEnum.B,
    },
    {
      gamification: GamificationEnum.NO_GAMIFICATION,
      financialInformation: FinancialInformationEnum.A,
    },
    {
      gamification: GamificationEnum.NO_GAMIFICATION,
      financialInformation: FinancialInformationEnum.B,
    },
  ];

  // Find the index of previous treatment groups
  const prevIndex = _.findIndex(assignSequence, (o) =>
    _.isEqual(o, prevTreatmentGroups)
  );

  // Return the next treatment combination
  const newIndex = (prevIndex + 1) % assignSequence.length;
  return assignSequence[newIndex];
}

export const roundToTwoDecimals = (v: number) => {
  return Math.round(v * 100) / 100;
};

export function formatAsCurrency(amount: number, showCurrency: boolean = true) {
  // Prevent Javascript's weird floating point precision creating signed negative 0
  if (Math.abs(amount) <= 0.00000001) {
    amount = 0;
  }

  let numberFormatOption = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    style: "decimal",
  };

  if (showCurrency) {
    numberFormatOption = Object.assign({}, numberFormatOption, {
      currency: "USD",
      style: "currency",
    });
  }

  let formattedStr = amount.toLocaleString("en-US", numberFormatOption);

  return formattedStr;
}

export const isValidAmountStr = (
  inputVal: string,
  minAmount: number,
  maxAmount: number
) => {
  if (!Number.isNaN(Number.parseFloat(inputVal))) {
    const newAmount = Number.parseFloat(inputVal);

    return newAmount >= minAmount && newAmount <= maxAmount;
  } else {
    return false;
  }
};

export const parseAmountStr = (amountStr: string) => {
  let cleanedAmountStr = amountStr.replace(/[^0-9\.]/g, "");
  let parsedAmount = Number.parseFloat(cleanedAmountStr);

  // Round to 2 nearest decimals
  parsedAmount = roundToTwoDecimals(parsedAmount);

  return parsedAmount;
};
