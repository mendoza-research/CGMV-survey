import { State } from "zustand";

export enum Gamification {
  GAMIFICATION = "GAMIFICATION",
  NO_GAMIFICATION = "NO_GAMIFICATION",
}

export enum FinancialInformation {
  A = "A",
  B = "B",
}

export interface ISurveyState extends State {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  gamification: Gamification;
  setGamification: (mode: Gamification) => void;
  financialInformation: FinancialInformation;
  setFinancialInformation: (mode: FinancialInformation) => void;
  currentPathname: string;
  setCurrentPathname: (newPathname: string) => void;
  visitedPathnames: string[];
}
