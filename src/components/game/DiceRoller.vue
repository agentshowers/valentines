<script setup lang="ts">
import { Game } from '@/assets/gameLogic'
import TheDice from './TheDice.vue'

const { game, allowRoll } = defineProps<{
  game: Game
  allowRoll: boolean
}>()
</script>

<template>
  <div :class="'dice-container' + (allowRoll ? '' : ' extra-padding')">
    <TheDice :value="game.dice" :ratio="0.75" />
    <div>
      <button v-if="allowRoll" @click="game.rollDice()">Roll Dice</button>
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
</style>
