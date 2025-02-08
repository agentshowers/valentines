<script setup lang="ts">
import { Game } from '@/assets/gameLogic'
import PhotoReward from './PhotoReward.vue'
import VideoReward from './VideoReward.vue'

defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="rewards">
    <div class="column">
      <div class="row">
        <PhotoReward :game="game" :index="0" />
        <PhotoReward :game="game" :index="1" />
        <PhotoReward :game="game" :index="2" />
      </div>
      <div class="row">
        <PhotoReward :game="game" :index="3" />
        <PhotoReward :game="game" :index="4" />
        <PhotoReward :game="game" :index="5" />
      </div>
      <div class="row">
        <PhotoReward :game="game" :index="7" />
        <PhotoReward :game="game" :index="8" />
      </div>
    </div>
    <div class="column">
      <div class="row">
        <VideoReward :game="game" :index="0" />
        <VideoReward :game="game" :index="1" />
      </div>
      <div class="row">
        <VideoReward :game="game" :index="2" />
        <VideoReward :game="game" :index="3" />
      </div>
      <div class="row">
        <VideoReward :game="game" :index="4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rewards {
  margin-top: 30px;
  display: flex;
  padding: 0px 25px;
  padding-top: 0px;
  justify-content: space-between;
  border-top: 2px solid var(--vt-c-gold);
  padding-top: 20px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 15px;
  justify-content: center;
}
</style>
