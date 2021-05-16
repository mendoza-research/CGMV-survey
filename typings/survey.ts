import { SnakeGameController } from "lib/snake-game";
import { State } from "zustand";

export enum GamificationEnum {
  GAMIFICATION = "GAMIFICATION",
  NO_GAMIFICATION = "NO_GAMIFICATION",
}

export enum FinancialInformationEnum {
  A = "A",
  B = "B",
}

export interface ISurveyState extends State {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  gamification: GamificationEnum;
  setGamification: (mode: GamificationEnum) => void;
  financialInformation: FinancialInformationEnum;
  setFinancialInformation: (mode: FinancialInformationEnum) => void;
  currentPathname: string;
  setCurrentPathname: (newPathname: string) => void;
  visitedPathnames: string[];
  snakeGameController: SnakeGameController;
  setSnakeGameController: (controller: SnakeGameController) => void;
}

export interface ISingleQuestion {
  text: React.ReactNode;
  options: string[];
}
