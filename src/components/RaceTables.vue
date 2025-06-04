<template>
  <ui-card>
    <div class="flex flex-col md:grid md:grid-cols-2 gap-4">
      <!-- Program Tables Comes Here -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold mb-4">Program</h2>
        <div
          class="overflow-y-auto space-y-4"
          :style="{ height: '600px', maxHeight: '600px' }"
        >
          <div
            v-for="race in races"
            :key="race.round"
            class="bg-gray-50 rounded-lg p-3"
          >
            <h3 class="font-semibold mb-2">{{ lapTitle(race) }}</h3>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-2 py-1 text-left text-xs font-medium text-gray-500"
                  >
                    Position
                  </th>
                  <th
                    class="px-2 py-1 text-left text-xs font-medium text-gray-500"
                  >
                    Horse
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="(horse, index) in race.horses"
                  :key="horse.id"
                  :class="{ 'bg-blue-50': race.round === selectedLap }"
                >
                  <td class="px-2 py-1">{{ index + 1 }}</td>
                  <td class="px-2 py-1">
                    <div class="flex items-center space-x-2">
                      <div
                        class="w-3 h-3 rounded-full"
                        :style="{ backgroundColor: horse.color }"
                      ></div>
                      <span>{{ horse.name }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="races.length === 0"
            class="text-center text-gray-500 py-10"
          >
            No items generated.
          </div>
        </div>
      </div>
      <!-- Results Tables  Comes Here-->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold mb-4">Results</h2>
        <div class="max-h-[600px] overflow-y-auto space-y-4">
          <div
            v-for="race in races"
            :key="race.round"
            class="bg-gray-50 rounded-lg p-3"
          >
            <h3
              class="font-semibold mb-2 cursor-pointer hover:text-red-600"
              @click="$emit('select-lap', race.round)"
            >
              {{ lapTitle(race) }}
            </h3>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-2 py-1 text-left text-xs font-medium text-gray-500"
                  >
                    Position
                  </th>
                  <th
                    class="px-2 py-1 text-left text-xs font-medium text-gray-500"
                  >
                    Horse
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(horse, index) in race.results" :key="horse.id">
                  <td class="px-2 py-1">{{ index + 1 }}</td>
                  <td class="px-2 py-1">
                    <div class="flex items-center space-x-2">
                      <div
                        class="w-3 h-3 rounded-full"
                        :style="{ backgroundColor: horse.color }"
                      ></div>
                      <span>{{ horse.name }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="races.length === 0"
            class="text-center text-gray-500 py-10"
          >
            No items generated.
          </div>
        </div>
      </div>
    </div>
  </ui-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiCard from "../ui/UiCard.vue";
import type { Race } from "../types";

export default defineComponent({
  name: "RaceTables",
  components: {
    UiCard,
  },
  props: {
    races: {
      type: Array as () => Race[],
      required: true,
    },
    selectedLap: {
      type: Number,
      required: true,
    },
    lapTitle: {
      type: Function as unknown as () => (race: Race) => string,
      required: true,
    },
  },
  emits: ["select-lap"],
});
</script>
