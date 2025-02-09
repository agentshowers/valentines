<script setup lang="ts">
import StartScreen from './components/StartScreen.vue'
import TheGame from './components/TheGame.vue'
import { Game, loadGame } from '@/assets/gameLogic'
import { ref } from 'vue'

const game = ref(loadGame())
const started = ref(false)

function startGame() {
  game.value = Game.newGame()
  started.value = true
}

function continueGame() {
  started.value = true
}
</script>

<template>
  <main>
    <TheGame v-if="started" :game="game!" />
    <StartScreen v-else @start-game="startGame" @continue-game="continueGame" :game="game" />
  </main>
</template>
