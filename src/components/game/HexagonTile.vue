<script setup lang="ts">
defineProps(['color', 'filled'])
</script>

<template>
  <div class="hexagon-tile hexagon-background"></div>
</template>

<style scoped>
.hexagon-background {
  background-color: v-bind(color);
  opacity: v-bind(filled ? 1: 0.2);
}
</style>
