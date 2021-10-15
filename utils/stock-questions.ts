import { StakesEnum } from "typings/survey";

export interface IStockProceeds {
  probability: number;
  proceeds: number;
}

export type IStock = Array<IStockProceeds>;

export interface IStockQuestion {
  thisStock: IStock;
  thatStock: IStock;
}

let lowStakesStockQuestions: Array<IStockQuestion> = [];
let highStakesStockQuestions: Array<IStockQuestion> = [];

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
