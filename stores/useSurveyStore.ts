import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  GamificationEnum,
  FinancialInformationEnum,
  ISurveyState,
} from "typings/survey";

const useSurveyStore = create<ISurveyState>(
  devtools((set, get) => ({
    sessionId: null,
    // Session IDs are automatically generated from Postgre
    setSessionId: (sessionId: string) =>
      set(() => ({
        sessionId,
      })),
    // Randomly assign Gamification Mode (Gamification or NoGamification)
    gamification: null,
    setGamification: (mode: GamificationEnum) =>
      set(() => ({
        gamification: mode,
      })),
    // Randomly assign Financial Information Mode (A or B)
    financialInformation: null,
    setFinancialInformation: (mode: FinancialInformationEnum) =>
      set(() => ({
        financialInformation: mode,
      })),

    // States used to prevent back navigation
    currentPathname: "/",
    setCurrentPathname: (newPathname: string) =>
      set((state) => ({
        visitedPathnames: [...state.visitedPathnames, newPathname],
        currentPathname: newPathname,
      })),
    visitedPathnames: [],
  }))
);

export default useSurveyStore;
