import create from "zustand";
import randomstring from "randomstring";

import {
  GamificationMode,
  FinancialInformationMode,
  ISurveyState,
} from "typings/survey";

const useSurveyStore = create<ISurveyState>((set, get) => ({
  participantId: randomstring.generate({
    length: 6,
    charset: "alphanumeric",
    capitalization: "lowercase",
  }),
  // Randomly assign Gamification MOde (Gamification or NoGamification)
  gamificationMode:
    Math.random() < 0.5
      ? GamificationMode.Gamification
      : GamificationMode.NoGamification,
  setGamificationMode: (mode: GamificationMode) =>
    set((state) => ({
      gamificationMode: mode,
    })),
  // Randomly assign Financial Information Mode (A or B)
  financialInformationMode:
    Math.random() < 0.5
      ? FinancialInformationMode.A
      : FinancialInformationMode.B,
  setFinancialInformationMode: (mode: FinancialInformationMode) =>
    set((state) => ({
      financialInformationMode: mode,
    })),
  currentPathname: "/",
  setCurrentPathname: (newPathname: string) =>
    set((state) => ({
      currentPathname: newPathname,
    })),
}));

export default useSurveyStore;
