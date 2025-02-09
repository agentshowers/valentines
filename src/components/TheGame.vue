<script setup lang="ts">
import GameBoard from './game/GameBoard.vue'
import HexagonTile from './game/HexagonTile.vue'
import RewardsList from './game/RewardsList.vue'
import TileSelection from './game/TileSelection.vue'
import { watch } from 'vue'
import { Game, GameState, HexagonState, Reward, DARES } from '@/assets/gameLogic'
import { PHOTOS, VIDEOS, PHOTO_CAPTIONS, VIDEO_CAPTIONS } from '@/assets/memories'

const { game } = defineProps<{
  game: Game
}>()

watch(
  () => game,
  (newGame) => {
    newGame.save()
  },
  { deep: true },
)
</script>

<template>
  <GameBoard :game="game" />
  <div class="game-state">
    <div class="resource">
      <img alt="Workers" src="@/assets/images/worker.png" />
      {{ game.workers }}
    </div>
    <div class="resource">
      <img alt="Silver" src="@/assets/images/silver.png" />
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
          <a :href="PHOTOS[game.photosUnlocked]" target="_blank">{{
            PHOTO_CAPTIONS[game.photosUnlocked]
          }}</a>
        </p>
      </div>
      <button @click="game.acceptTileReward()" class="button reward-button">
        <span v-if="game.reward === Reward.Silver">Let's go!</span>
        <span v-else-if="game.reward === Reward.Workers">Nice!</span>
        <span v-else-if="game.reward === Reward.Memory">Awww</span>
        <span v-else>Accept Reward</span>
      </button>
    </div>
    <div v-else-if="game.state === GameState.RegionReward" class="region-reward">
      <div class="reward-text">
        <p class="centered-text">You completed a region and unlocked a new memory!</p>
        <p class="centered-text">
          <a :href="VIDEOS[game.videosUnlocked]" target="_blank">{{
            VIDEO_CAPTIONS[game.videosUnlocked]
          }}</a>
        </p>
      </div>
      <button @click="game.acceptRegionReward()" class="button reward-button">😍😘🥰</button>
    </div>
    <div v-else-if="game.state === GameState.GameOver" class="reward-text">
      <p class="centered-text">Game Over!</p>
      <p class="centered-text">Reward: you can now make out 😘</p>
    </div>
  </div>
  <RewardsList :game="game" />
</template>

<style scoped>
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
  margin-top: 40px;
  height: 110px;
}

.roll-or-buy {
  height: 100%;
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

.centered-text {
  display: flex;
  justify-content: center;
}

.reward-button {
  padding: 5px 10px;
}
</style>
