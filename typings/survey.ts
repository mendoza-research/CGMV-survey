import { State } from "zustand";

export enum GamificationMode {
  Gamification = "Gamification",
  NoGamification = "NoGamification",
}

export enum FinancialInformationMode {
  A = "A",
  B = "B",
}

export interface ISurveyState extends State {
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  gamificationMode: GamificationMode;
  setGamificationMode: (mode: GamificationMode) => void;
  financialInformationMode: FinancialInformationMode;
  setFinancialInformationMode: (mode: FinancialInformationMode) => void;
  currentPathname: string;
  setCurrentPathname: (newPathname: string) => void;
}
