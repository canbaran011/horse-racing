import type { GameState } from "../types";

export const getters = {
  currentRace: (state: GameState) => state.races[state.currentRound - 1],
  isLastRound: (state: GameState) => state.currentRound === state.races.length,
};
