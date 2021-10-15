import { SnakeGameController } from "lib/snake-game";
import { State } from "zustand";

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
  snakeGameController: SnakeGameController;
  setSnakeGameController: (controller: SnakeGameController) => void;
  getPaymentCode: () => string;
}

export interface ISingleQuestion {
  text: React.ReactNode;
  options: string[];
}
