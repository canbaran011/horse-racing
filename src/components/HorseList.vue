<template>
  <ui-card>
    <h2 class="text-xl font-semibold mb-4">Horses</h2>
    <div
      class="space-y-2 overflow-y-auto"
      :style="{ height: '600px', maxHeight: '600px' }"
    >
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="p-3 rounded-lg shadow-sm flex items-center space-x-3"
        :style="{ backgroundColor: horse.color + '20' }"
      >
        <div
          class="w-6 h-6 rounded-full"
          :style="{ backgroundColor: horse.color }"
        ></div>
        <div>
          <div class="font-semibold">{{ horse.name }}</div>
          <div class="text-sm">
            Conditions: {{ horse.conditions.join(", ") }}
          </div>
        </div>
      </div>
      <div v-if="horses.length === 0" class="text-center text-gray-500 py-10">
        No items generated.
      </div>
    </div>
  </ui-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiCard from "../ui/UiCard.vue";
import type { Horse } from "../types";

export default defineComponent({
  name: "HorseList",
  components: {
    UiCard,
  },
  props: {
    horses: {
      type: Array as () => Horse[],
      required: true,
    },
  },
});
</script>
