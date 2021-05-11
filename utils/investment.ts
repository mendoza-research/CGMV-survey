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

  // Return the next treatment groups
  const newIndex = (prevIndex + 1) % assignSequence.length;

  // Return
  return assignSequence[newIndex];
}

export function formatAsCurrency(amount: number, showCurrency: boolean = true) {
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
