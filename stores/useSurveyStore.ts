import create from "zustand";
import { devtools } from "zustand/middleware";
import { GamificationEnum, StakesEnum, ISurveyState } from "typings/survey";
import { IStock } from "typings/stock-questions";

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
    stakes: null,
    setStakes: (mode: StakesEnum) =>
      set(() => ({
        stakes: mode,
      })),

    // States used to prevent back navigation
    currentPathname: "/",
    setCurrentPathname: (newPathname: string) =>
      set((state) => ({
        visitedPathnames: [...state.visitedPathnames, newPathname],
        currentPathname: newPathname,
      })),
    visitedPathnames: [],
    freeStock: null,
    setFreeStock: (freeStock: IStock) =>
      set(() => ({
        freeStock,
      })),
    stockProceeds: 0,
    setStockProceeds: (stockProceeds: number) =>
      set(() => ({
        stockProceeds,
      })),
    lotteryProceeds: 0,
    setLotteryProceeds: (lotteryProceeds: number) =>
      set(() => ({
        lotteryProceeds,
      })),
    getPaymentCode: () => {
      const sessionId = get().sessionId;
      return sessionId ? sessionId.substring(0, 6) : null;
    },
  }))
);

export default useSurveyStore;
