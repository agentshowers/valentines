<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'
import { Game } from '@/assets/gameLogic'

const { game, allowRoll } = defineProps<{
  game: Game
  allowRoll: boolean
}>()

const dice = useTemplateRef('dice')

watchEffect(() => {
  updateDice(game.dice)
})

function updateDice(value: number) {
  if (!dice.value) {
    return
  }
  for (let i = 1; i <= 6; i++) {
    dice.value.classList.remove('show-' + i)
    if (value === i) {
      dice.value.classList.add('show-' + i)
    }
  }
}
</script>

<template>
  <div class="dice-container">
    <div ref="dice" class="dice">
      <div class="side one">
        <div class="dot one-1"></div>
      </div>
      <div class="side two">
        <div class="dot two-1"></div>
        <div class="dot two-2"></div>
      </div>
      <div class="side three">
        <div class="dot three-1"></div>
        <div class="dot three-2"></div>
        <div class="dot three-3"></div>
      </div>
      <div class="side four">
        <div class="dot four-1"></div>
        <div class="dot four-2"></div>
        <div class="dot four-3"></div>
        <div class="dot four-4"></div>
      </div>
      <div class="side five">
        <div class="dot five-1"></div>
        <div class="dot five-2"></div>
        <div class="dot five-3"></div>
        <div class="dot five-4"></div>
        <div class="dot five-5"></div>
      </div>
      <div class="side six">
        <div class="dot six-1"></div>
        <div class="dot six-2"></div>
        <div class="dot six-3"></div>
        <div class="dot six-4"></div>
        <div class="dot six-5"></div>
        <div class="dot six-6"></div>
      </div>
    </div>
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
</style>
