<script setup lang="ts">
import StartScreen from './components/StartScreen.vue'
import TheGame from './components/TheGame.vue'
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <main>
    <TheGame v-if="started" />
    <StartScreen v-else @start-game="started = true" />
  </main>
</template>
