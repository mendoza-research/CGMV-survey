import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  GamificationMode,
  FinancialInformationMode,
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
    gamificationMode:
      Math.random() < 0.5
        ? GamificationMode.Gamification
        : GamificationMode.NoGamification,
    setGamificationMode: (mode: GamificationMode) =>
      set(() => ({
        gamificationMode: mode,
      })),
    // Randomly assign Financial Information Mode (A or B)
    financialInformationMode:
      Math.random() < 0.5
        ? FinancialInformationMode.A
        : FinancialInformationMode.B,
    setFinancialInformationMode: (mode: FinancialInformationMode) =>
      set(() => ({
        financialInformationMode: mode,
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
