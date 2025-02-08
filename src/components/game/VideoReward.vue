<script setup lang="ts">
import { Game } from '@/assets/gameLogic'
import { VIDEOS } from '@/assets/memories'

defineProps<{
  game: Game
  index: number
}>()
</script>

<template>
  <a v-if="game.videosUnlocked > index" :href="VIDEOS[index]" target="_blank">
    <img alt="reward" class="image-reward" src="@/assets/images/videoreward.png" />
  </a>
  <img v-else alt="lockedreward" class="image-reward" src="@/assets/images/videolocked.png" />
</template>

<style scoped>
a {
  height: 50px;
}
</style>
