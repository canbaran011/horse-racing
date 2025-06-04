import type { GameState, Horse, Race } from "../types";
import { HORSE_COLORS, NUM_LAPS, RACE_DISTANCES } from "./constants";

const generateHorse = (id: number): Horse => ({
  id,
  name: `Horse ${id}`,
  color: HORSE_COLORS[id - 1],
  conditions: Array.from(
    { length: NUM_LAPS },
    () => Math.floor(Math.random() * 100) + 1
  ),
});

const generateHorses = (count: number): Horse[] => {
  return Array.from({ length: count }, (_, i) => generateHorse(i + 1));
};

export const actions = {
  generateHorses({ commit }: { commit: any }) {
    const horseCount = Math.floor(Math.random() * 20) + 1;
    const horses = generateHorses(horseCount);
    commit("SET_HORSES", horses);
  },

  generateRaceSchedule({ state, commit }: { state: GameState; commit: any }) {
    const races: Race[] = RACE_DISTANCES.map((distance, index) => ({
      round: index + 1,
      distance,
      horses: [],
      isComplete: false,
    }));

    // Include all horses in every lap
    races.forEach((race, lapIdx) => {
      race.horses = state.horses.map((h) => ({
        ...h,
        condition: h.conditions[lapIdx],
      }));
    });

    commit("SET_RACES", races);
    commit("SET_CURRENT_ROUND", 1);
    commit("SET_GAME_STARTED", false);
    commit("SET_GAME_COMPLETE", false);
  },

  startRace({
    state,
    commit,
    dispatch,
  }: {
    state: GameState;
    commit: any;
    dispatch: any;
  }) {
    // If game is complete, reset everything
    if (state.isGameComplete) {
      commit("SET_CURRENT_ROUND", 1);
      commit("SET_GAME_COMPLETE", false);
    }

    // Find the first incomplete race to continue from
    const nextIncompleteRace = state.races.find((race) => !race.isComplete);
    if (nextIncompleteRace) {
      commit("SET_CURRENT_ROUND", nextIncompleteRace.round);
    } else if (!state.isGameComplete) {
      // If no incomplete races but game isn't complete, start from beginning
      commit("SET_CURRENT_ROUND", 1);
    }

    state.shouldContinue = true;
    commit("SET_GAME_STARTED", true);
    dispatch("runCurrentRound");
  },

  runCurrentRound({
    state,
    commit,
    dispatch,
  }: {
    state: GameState;
    commit: any;
    dispatch: any;
  }) {
    const currentRace = state.races[state.currentRound - 1];
    if (!currentRace) return;

    // Simulate race results based on horse conditions for this lap
    const results = [...currentRace.horses].sort(
      (a, b) =>
        b.conditions[state.currentRound - 1] -
        a.conditions[state.currentRound - 1]
    );
    commit("UPDATE_RACE_RESULTS", { round: state.currentRound, results });

    if (state.currentRound < state.races.length && state.shouldContinue) {
      commit("SET_CURRENT_ROUND", state.currentRound + 1);
      setTimeout(() => {
        if (state.shouldContinue) {
          dispatch("runCurrentRound");
        }
      }, 2000);
    } else {
      commit("SET_GAME_COMPLETE", true);
    }
  },
};
