import type { GameState, Horse, Race } from "../types";

export const mutations = {
  SET_HORSES(state: GameState, horses: Horse[]) {
    state.horses = horses;
  },
  SET_RACES(state: GameState, races: Race[]) {
    state.races = races;
  },
  SET_CURRENT_ROUND(state: GameState, round: number) {
    state.currentRound = round;
  },
  SET_GAME_STARTED(state: GameState, started: boolean) {
    state.isGameStarted = started;
    if (!started) {
      state.shouldContinue = false;
    }
  },
  SET_GAME_COMPLETE(state: GameState, complete: boolean) {
    state.isGameComplete = complete;
  },
  UPDATE_RACE_RESULTS(
    state: GameState,
    { round, results }: { round: number; results: Horse[] }
  ) {
    const race = state.races.find((r) => r.round === round);
    if (race) {
      race.results = results;
      race.isComplete = true;
    }
  },
};
