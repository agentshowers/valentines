<script setup lang="ts">
import Header from './components/MainHeader.vue'
import StartGame from './components/StartGame.vue'
import TheGame from './components/game/TheGame.vue'
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <TheGame v-if="started" />
    <StartGame v-else text="Start the game" @start-game="started = true" />
  </main>
</template>
