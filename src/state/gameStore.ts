import { create } from "zustand";
interface GameState {
  score: number;
  isPlaying: boolean;
}
interface GameActions {
  incrementScore: () => void;
  resetScore: () => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>((set) => ({
  score: 0,
  isPlaying: false,
  incrementScore: () =>
    set((state) => {
      const newScore = state.score + 1;
      return {
        score: newScore,
      };
    }),
  resetScore: () => set({ score: 0 }),
}));
