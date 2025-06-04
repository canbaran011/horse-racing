<template>
  <button
    :class="[
      'font-bold py-2 px-4 rounded transition',
      color === 'primary' ? 'bg-blue-500 hover:bg-blue-700 text-white' : '',
      color === 'danger' ? 'bg-red-500 hover:bg-red-700 text-white' : '',
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ color?: 'primary' | 'danger', disabled?: boolean }>();
</script> 