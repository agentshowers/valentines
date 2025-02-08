<script setup lang="ts">
import { Game, HexagonState, INDEX_COLORS } from '@/assets/gameLogic'
import HexagonTile from './HexagonTile.vue'
import TheDice from './TheDice.vue'

const { game, value } = defineProps<{
  game: Game
  value: number
}>()

function pickTile() {
  if (!game.canPick(value)) {
    return
  }
  game.pickTile(value)
}
</script>

<template>
  <div class="tile-picker" @click="pickTile()">
    <div class="picker-dice">
      <TheDice :value="value" :ratio="0.3" />
    </div>
    <HexagonTile
      :color="INDEX_COLORS[value]"
      :state="game.canPick(value) ? HexagonState.Filled : HexagonState.Empty"
    />
  </div>
</template>

<style>
.tile-picker {
  display: flex;
}

.picker-dice {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
}
</style>
