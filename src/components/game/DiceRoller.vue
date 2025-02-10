<script setup lang="ts">
import { Game } from '@/assets/gameLogic'
import TheDice from './TheDice.vue'

const { game, allowRoll } = defineProps<{
  game: Game
  allowRoll: boolean
}>()
</script>

<template>
  <div class="dice-container">
    <TheDice :value="game.dice" :ratio="0.75" />
    <div>
      <button v-if="allowRoll" @click="game.rollDice()" class="button">Roll</button>
      <button v-else @click="game.gainWorker()" class="button workers-button">
        +1 <img class="inline-image" alt="Workers" src="@/assets/images/worker.png" />
      </button>
    </div>
  </div>
</template>

<style>
:root {
  --dice-ratio: 0.75;
}

.dice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  height: 100%;
}

.extra-padding {
  padding-top: 30px;
}

.inline-image {
  height: 20px;
}

.workers-button {
  margin-top: 10px;
  display: flex;
  padding: 5px 10px;
  align-items: center;
}
</style>
