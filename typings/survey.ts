import { State } from "zustand";
import { IStock } from "./stock-questions";

export enum GamificationEnum {
  GAMIFICATION = "GAMIFICATION",
  NO_GAMIFICATION = "NO_GAMIFICATION",
}

export enum StakesEnum {
  LOW_STAKES = "LOW_STAKES",
  HIGH_STAKES = "HIGH_STAKES",
}

export interface ISurveyState extends State {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  gamification: GamificationEnum;
  setGamification: (mode: GamificationEnum) => void;
  stakes: StakesEnum;
  setStakes: (mode: StakesEnum) => void;
  currentPathname: string;
  setCurrentPathname: (newPathname: string) => void;
  visitedPathnames: string[];
  freeStock: IStock;
  setFreeStock: (stock: IStock) => void;
  stockProceeds: number;
  setStockProceeds: (v: number) => void;
  lotteryProceeds: number;
  setLotteryProceeds: (v: number) => void;
  getPaymentCode: () => string;
}

export interface ISingleQuestion {
  text: React.ReactNode;
  options: string[];
}
