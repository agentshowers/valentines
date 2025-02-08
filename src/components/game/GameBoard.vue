<script setup lang="ts">
import HexagonTile from './HexagonTile.vue'
import { Game } from '@/assets/gameLogic'

defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="game-board">
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in game.hexagons.slice(0, 3)" :key="index">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index)"
        />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in game.hexagons.slice(3, 7)" :key="index + 3">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 3)"
        />
      </div>
    </div>
    <div class="hexagon-row row-5">
      <div v-for="(hexagon, index) in game.hexagons.slice(7, 12)" :key="index + 7">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 7)"
        />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in game.hexagons.slice(12, 16)" :key="index + 12">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 12)"
        />
      </div>
    </div>
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in game.hexagons.slice(16, 19)" :key="index + 16">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 16)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  margin-top: 20px;
}

.hexagon-row {
  display: flex;
  justify-content: center;
  margin-bottom: calc(var(--hex-margin) - var(--hex-width) * 0.2885);
}
</style>
