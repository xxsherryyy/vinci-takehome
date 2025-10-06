import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "../state/gameStore";

describe("GameStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    useGameStore.setState({
      score: 0,
      isPlaying: false,
    });
  });

  describe("initial state", () => {
    it("should have initial score of 0", () => {
      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });
  });

  describe("incrementScore", () => {
    it("should increment score by 1", () => {
      const { incrementScore } = useGameStore.getState();

      incrementScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(1);
    });

    it("should increment score multiple times", () => {
      const { incrementScore } = useGameStore.getState();

      incrementScore();
      incrementScore();
      incrementScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(3);
    });

    it("should increment score from non-zero value", () => {
      // Set initial score to 5
      useGameStore.setState({ score: 5 });

      const { incrementScore } = useGameStore.getState();
      incrementScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(6);
    });
  });

  describe("resetScore", () => {
    it("should reset score to 0", () => {
      // Set initial score to 10
      useGameStore.setState({ score: 10 });

      const { resetScore } = useGameStore.getState();
      resetScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });

    it("should reset score from any value", () => {
      // Set initial score to 25
      useGameStore.setState({ score: 25 });

      const { resetScore } = useGameStore.getState();
      resetScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });

    it("should reset score when already at 0", () => {
      const { resetScore } = useGameStore.getState();
      resetScore();

      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });
  });

  describe("score interactions", () => {
    it("should handle increment and reset sequence", () => {
      const { incrementScore, resetScore } = useGameStore.getState();

      // Increment multiple times
      incrementScore();
      incrementScore();
      incrementScore();

      let state = useGameStore.getState();
      expect(state.score).toBe(3);

      // Reset
      resetScore();

      state = useGameStore.getState();
      expect(state.score).toBe(0);

      // Increment again
      incrementScore();

      state = useGameStore.getState();
      expect(state.score).toBe(1);
    });
  });
});
