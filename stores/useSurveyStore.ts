import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  GamificationEnum,
  FinancialInformationEnum,
  ISurveyState,
} from "typings/survey";
import { SnakeGameController } from "lib/snake-game";

const useSurveyStore = create<ISurveyState>(
  devtools((set, get) => ({
    sessionId: null,
    // Session IDs are automatically generated from Postgre
    setSessionId: (sessionId: string) =>
      set(() => ({
        sessionId,
      })),
    gamification: null,
    setGamification: (mode: GamificationEnum) =>
      set(() => ({
        gamification: mode,
      })),
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
    snakeGameController: null,
    setSnakeGameController: (controller: SnakeGameController) =>
      set(() => ({
        snakeGameController: controller,
      })),
  }))
);

export default useSurveyStore;
