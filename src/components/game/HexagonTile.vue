<script setup lang="ts">
defineProps<{
  color: string
  filled: boolean
}>()
</script>

<template>
  <div class="hexagon-tile hexagon-background"></div>
</template>

<style scoped>
.hexagon-background {
  background-color: v-bind(color);
  opacity: v-bind(filled ? 1: 0.3);
}
</style>
