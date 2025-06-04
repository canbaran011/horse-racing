import type { GameState } from "../types";

export const state: GameState = {
  horses: [],
  races: [],
  currentRound: 0,
  isGameStarted: false,
  isGameComplete: false,
  shouldContinue: true,
};
