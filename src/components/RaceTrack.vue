<template>
  <ui-card>
    <h2 class="text-xl font-semibold mb-4">Race Track - {{ title }}</h2>
    <div
      ref="trackContainer"
      class="relative w-full max-w-lg overflow-y-auto"
      :style="{ height: '600px', maxHeight: '600px' }"
    >
      <div
        v-for="(horse, idx) in horses"
        :key="horse.id"
        class="absolute flex items-center left-0 border border-dashed"
        :style="{ top: `${idx * 60}px`, height: '60px', width: '100%' }"
      >
        <div class="w-10 flex items-center justify-center">
          <div
            class="w-8 h-8 text-white flex items-center justify-center rounded"
            :style="{ backgroundColor: horse.color }"
          >
            {{ idx + 1 }}
          </div>
        </div>
        <div class="absolute" :style="getHorseResultStyle(horse.id)">
          <span
            v-if="getHorseLapPosition(horse.id) !== null"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 font-bold text-sm pointer-events-none"
            style="z-index: 2"
          >
            {{ getHorseLapPosition(horse.id) + "." }}
          </span>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/horse.png"
            class="w-10 h-10"
            :alt="horse.name"
          />
        </div>
        <div class="absolute right-0 h-12 w-1 bg-red-500 ml-2"></div>
      </div>
      <div v-if="horses.length === 0" class="text-center text-gray-500 py-10">
        No items generated.
      </div>
    </div>
  </ui-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import UiCard from "../ui/UiCard.vue";
import type { Horse } from "../types";

export default defineComponent({
  name: "RaceTrack",
  components: {
    UiCard,
  },
  props: {
    horses: {
      type: Array as () => Horse[],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    getHorseResultStyle: {
      type: Function as unknown as () => (id: number) => Record<string, string>,
      required: true,
    },
    getHorseLapPosition: {
      type: Function as unknown as () => (id: number) => number | null,
      required: true,
    },
  },
  emits: ["track-width-change"],
  setup(props, { emit }) {
    const trackContainer = ref<HTMLElement | null>(null);

    const updateTrackWidth = () => {
      if (trackContainer.value) {
        const width = trackContainer.value.clientWidth;
        emit("track-width-change", width);
      }
    };

    onMounted(() => {
      updateTrackWidth();
      window.addEventListener("resize", updateTrackWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateTrackWidth);
    });

    return {
      trackContainer,
    };
  },
});
</script>
