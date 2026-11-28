import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useStatisticsStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0,
  actions: {
    handleGood: () => set((state) => ({ good: state.good + 1 })),
    handleNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    handleBad: () => set((state) => ({ bad: state.bad + 1 })),
    handleAll: () =>
      set((state) => state.all + state.good + +state.neutral + state.bad),
    handleAverage: () => set((state) => state.average + state.all / 3),
    handlePositive: () =>
      set((state) => state.positive + (state.good + state.neutral) / 2),
  },
}))

export const useStatistics = () =>
  useStatisticsStore(
    useShallow((state) => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad,
      all: state.all,
      average: state.average,
      positive: state.positive,
    })),
  )

export const useStatisticsControls = () =>
  useStatisticsStore((state) => state.actions)
