<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="container mx-auto">
      <h1
        class="text-3xl font-bold text-center mb-4 border rounded-lg bg-white py-2 px-4"
      >
        Horse Racing Game
      </h1>

      <!-- Buttons -->
      <div class="flex justify-center space-x-6 mb-4">
        <button
          @click="generateRaceSchedule"
          class="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-2xl disabled:bg-gray-400"
          :disabled="isGameStarted"
        >
          Generate Program
        </button>
        <button
          @click="toggleRace"
          class="bg-gray-800 hover:bg-green-700 text-white font-bold py-2 px-6 mx-4 rounded-2xl disabled:bg-gray-400"
          :disabled="!races.length || !horses.length"
        >
          {{ isGameStarted ? "Pause" : "Start" }}
        </button>
      </div>

      <!-- Main -->
      <div class="flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <!-- Left Column: Horse List -->
        <div class="w-full">
          <HorseList :horses="horses" />
        </div>

        <!-- Middle Column: Race Track -->
        <div class="w-full">
          <RaceTrack
            :horses="horses"
            :title="selectedLapTitle"
            :get-horse-result-style="getHorseResultStyle"
            :get-horse-lap-position="getHorseLapPosition"
            @track-width-change="handleTrackWidthChange"
          />
        </div>

        <!-- Right Column: Program and Results Tables -->
        <div class="w-full">
          <RaceTables
            :races="races"
            :selected-lap="selectedLap"
            :lap-title="lapTitle"
            @select-lap="selectLap"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Horse, Race } from "./types";
import HorseList from "./components/HorseList.vue";
import RaceTrack from "./components/RaceTrack.vue";
import RaceTables from "./components/RaceTables.vue";
import store from "./store";

function order(n: number) {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
}

export default defineComponent({
  name: "App",
  components: {
    HorseList,
    RaceTrack,
    RaceTables,
  },
  data() {
    return {
      selectedLap: 1,
      trackWidth: 0,
    };
  },
  computed: {
    horses(): Horse[] {
      return store.state.horses;
    },
    races(): Race[] {
      return store.state.races;
    },
    isGameStarted(): boolean {
      return store.state.isGameStarted;
    },
    isGameComplete(): boolean {
      return store.state.isGameComplete;
    },
    selectedLapHorsesSorted(): Horse[] {
      const race = this.races.find((r: Race) => r.round === this.selectedLap);
      if (race?.results) return race.results;
      return race?.horses || [];
    },
    selectedLapTitle() {
      const race = this.races.find((r: Race) => r.round === this.selectedLap);
      return race ? `${order(race.round)} Lap ${race.distance}m` : "";
    },
  },
  watch: {
    races: {
      handler(newRaces) {
        const latestRaceWithResults = [...newRaces]
          .reverse()
          .find((race) => race.results && race.results.length > 0);

        if (latestRaceWithResults) {
          this.selectedLap = latestRaceWithResults.round;
        }
      },
      deep: true,
    },
    isGameComplete(val) {
      if (val) {
        store.commit("SET_GAME_STARTED", false);
      }
    },
  },
  methods: {
    generateRaceSchedule() {
      store.dispatch("generateHorses");
      store.dispatch("generateRaceSchedule");
      this.selectedLap = 1;
    },
    handleTrackWidthChange(width: number) {
      this.trackWidth = width;
    },
    async toggleRace() {
      if (this.isGameStarted) {
        store.commit("SET_GAME_STARTED", false);
      } else {
        if (
          this.races.every((race) => race.results && race.results.length > 0)
        ) {
          this.selectedLap = 1;
          for (let i = 1; i <= this.races.length; i++) {
            this.selectedLap = i;
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds between each lap
          }
        } else {
          store.dispatch("startRace");
        }
      }
    },
    selectLap(lap: number) {
      this.selectedLap = lap;
    },
    lapTitle(race: Race) {
      return `${order(race.round)} lap - ${race.distance}m`;
    },
    getHorseResultStyle(horseId: number) {
      const idx = this.selectedLapHorsesSorted.findIndex(
        (h: Horse) => h.id === horseId
      );
      const total = this.selectedLapHorsesSorted.length;
      if (idx === -1 || total === 0) {
        return {
          left: "40px",
          top: "10px",
          transition: "left 1s cubic-bezier(0.4,0,0.2,1)",
        };
      }
      const min = 40;
      const max = this.trackWidth - 60;
      let left = min;
      if (total === 1) {
        left = max;
      } else {
        left = min + ((max - min) * (total - idx - 1)) / (total - 1);
      }
      return {
        left: `${left}px`,
        top: "10px",
        transition: "left 1s cubic-bezier(0.4,0,0.2,1)",
      };
    },
    getHorseLapPosition(horseId: number): number | null {
      const idx = this.selectedLapHorsesSorted.findIndex(
        (h: Horse) => h.id === horseId
      );
      return idx !== -1 ? idx + 1 : null;
    },
  },
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #edf2f7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #edf2f7;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 4px;
}

.horse-move-enter-active,
.horse-move-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.horse-move-enter-from,
.horse-move-leave-to {
  opacity: 0;
  transform: translateX(0);
}
</style>
