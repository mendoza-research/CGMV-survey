import { State } from "zustand";

export enum GamificationMode {
  Gamification = "Gamification",
  NoGamification = "NoGamification",
}

export enum FinancialInformationMode {
  A = "A",
  B = "B",
}

export interface IParticipantState extends State {
  participantId: string;
  gamificationMode: GamificationMode;
  setGamificationMode: (mode: GamificationMode) => void;
  financialInformationMode: FinancialInformationMode;
  setFinancialInformationMode: (mode: FinancialInformationMode) => void;
}
