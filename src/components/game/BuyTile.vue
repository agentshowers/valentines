<script setup lang="ts">
import HexagonTile from './HexagonTile.vue'
import { Game, HexagonState } from '@/assets/gameLogic'

defineProps<{
  color: string
  game: Game
}>()
</script>

<template>
  <div class="buy-area">
    <HexagonTile :color="color" :state="HexagonState.Filled" />
    <button :disabled="!game.canBuy(color)" @click="game.buyTile(color)">Buy</button>
  </div>
</template>

<style scoped>
.buy-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
