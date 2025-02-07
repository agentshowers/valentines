<script setup lang="ts">
import HexagonTile from './game/HexagonTile.vue'
import TileSelection from './game/TileSelection.vue'

import { ref } from 'vue'
import { Game, GameState, HexagonState, Reward, DARES } from '@/gameLogic'

const game = ref(Game.newGame())

function photoUrl(index: number) {
  return new URL(`../assets/memories/photos/${index}.jpg`, import.meta.url).href
}

function videoUrl(index: number) {
  return new URL(`../assets/memories/videos/${index}.mp4`, import.meta.url).href
}
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
  <div class="game-state">
    <div class="resource">
      <img alt="Workers" src="../assets/images/worker.png" />
      {{ game.workers }}
    </div>
    <div class="resource">
      <img alt="Silver" src="../assets/images/silver.png" />
      {{ game.silvers }}
    </div>
  </div>
  <div class="game-controls">
    <div
      v-if="game.state === GameState.RollOrBuy || game.state === GameState.TileSelection"
      class="roll-or-buy"
    >
      <TileSelection :game="game" />
    </div>
    <div v-else-if="game.state === GameState.TilePlacement" class="tile-placement">
      <HexagonTile :color="game.selectedColor!" :state="HexagonState.Filled" />
      Place the tile on the board
    </div>
    <div v-else-if="game.state === GameState.TileReward" class="tile-reward">
      <div v-if="game.reward === Reward.Silver" class="reward-text">
        <p class="centered-text">{{ DARES[game.daresCompleted] }}</p>
        <p class="centered-text">Reward: 1 silver</p>
      </div>
      <div v-else-if="game.reward === Reward.Workers">Reward: 2 workers</div>
      <div v-else-if="game.reward === Reward.Memory" class="reward-text">
        <p class="centered-text">You've unlocked a new memory!</p>
        <p class="centered-text">
          Click&nbsp;<a target="_blank" :href="photoUrl(game.photosUnlocked)">here</a>&nbsp;to see
          it
        </p>
      </div>
      <button @click="game.acceptTileReward()">Yay</button>
    </div>
    <div v-else-if="game.state === GameState.RegionReward" class="region-reward">
      <div class="reward-text">
        <p class="centered-text">You completed a region and unlocked a new memory!</p>
        <p class="centered-text">
          Click&nbsp;<a target="_blank" :href="videoUrl(game.videosUnlocked)">here</a>&nbsp;to see
          it
        </p>
      </div>
      <button @click="game.acceptRegionReward()">Yay</button>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  margin-top: 20px;
}

.game-state {
  display: flex;
  margin-top: -50px;
  justify-content: space-between;
  padding: 0px 15px;
}

.resource {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: x-large;
}

.resource img {
  width: 45px;
}

.game-controls {
  margin-top: 50px;
}

.pick-area {
  width: 50%;
}

.tile-placement {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.tile-reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.reward-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.region-reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
