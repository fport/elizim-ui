import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasCompletedTour: boolean;
  currentStep: number;
  isRunning: boolean;
  startTour: () => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeTour: () => void;
  resetTour: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedTour: false,
      currentStep: 0,
      isRunning: false,
      startTour: () => set({ isRunning: true, currentStep: 0 }),
      stopTour: () => set({ isRunning: false }),
      nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
      prevStep: () =>
        set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
      goToStep: (step) => set({ currentStep: step }),
      completeTour: () =>
        set({ isRunning: false, hasCompletedTour: true, currentStep: 0 }),
      resetTour: () =>
        set({ hasCompletedTour: false, currentStep: 0, isRunning: true }),
    }),
    {
      name: "elizim-onboarding",
      partialize: (state) => ({ hasCompletedTour: state.hasCompletedTour }),
    }
  )
);
