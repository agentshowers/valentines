<script setup lang="ts">
import Header from './MainHeader.vue'
defineEmits(['start-game'])
</script>

<template>
  <Header />
  <button @click="$emit('start-game')">Start the game</button>
</template>

<style scoped></style>
