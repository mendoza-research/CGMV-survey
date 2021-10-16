import { StakesEnum } from "typings/survey";
import { IStock, IStockQuestion } from "typings/stock-questions";
import Chance from "chance";

const lowStakesStockQuestions: Array<IStockQuestion> = [];
const highStakesStockQuestions: Array<IStockQuestion> = [];
const chance = new Chance();

for (let q = 1; q <= 10; q++) {
  const lowQuestion: IStockQuestion = {
    thisStock: [
      {
        probability: q * 0.1,
        proceeds: 0.21,
      },
      {
        probability: (10 - q) * 0.1,
        proceeds: 0.17,
      },
    ],
    thatStock: [
      {
        probability: q * 0.1,
        proceeds: 0.4,
      },
      {
        probability: (10 - q) * 0.1,
        proceeds: 0.01,
      },
    ],
  };
  const highQuestion: IStockQuestion = {
    thisStock: [
      {
        probability: q * 0.1,
        proceeds: 2,
      },
      {
        probability: (10 - q) * 0.1,
        proceeds: 1.6,
      },
    ],
    thatStock: [
      {
        probability: q * 0.1,
        proceeds: 3.85,
      },
      {
        probability: (10 - q) * 0.1,
        proceeds: 0.1,
      },
    ],
  };

  lowStakesStockQuestions.push(lowQuestion);
  highStakesStockQuestions.push(highQuestion);
}

export function getStockQuestions(stakes: StakesEnum): Array<IStockQuestion> {
  return stakes === StakesEnum.LOW_STAKES
    ? lowStakesStockQuestions
    : highStakesStockQuestions;
}

export function floatToPercentage(v: number, numDecimals: number = 0) {
  return v.toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: numDecimals,
  });
}

export function formatAsUSD(v: number, numDecimals: number = 2) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(v);
}

export function getRandomProceedsIndex(stock: IStock) {
  return chance.weighted(
    [0, 1],
    [stock[0].probability, stock[1].probability]
  ) as number;
}

export function getAdditionalBonus(stakes: StakesEnum) {
  const proceeds = stakes === StakesEnum.LOW_STAKES ? [1.7, 3.65] : [0.1, 0.2];
  const probabilities = [0.9, 0.1];

  return chance.weighted(proceeds, probabilities) as number;
}
