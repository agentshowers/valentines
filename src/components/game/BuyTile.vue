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
    <HexagonTile
      :color="color"
      :state="game.canBuy(color) ? HexagonState.Filled : HexagonState.Empty"
    />
    <button :disabled="!game.canBuy(color)" @click="game.buyTile(color)" class="button">Buy</button>
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
