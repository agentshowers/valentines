<script setup lang="ts">
import { Game } from '@/assets/gameLogic'

defineProps<{
  game: Game
  index: number
}>()

function videoUrl(index: number) {
  const path = `../assets/memories/videos/${index}.mp4`
  return new URL(path, import.meta.url).href
}
</script>

<template>
  <a v-if="game.videosUnlocked > index" :href="videoUrl(index)" target="_blank">
    <img alt="reward" class="image-reward" src="@/assets/images/videoreward.png" />
  </a>
  <img v-else alt="lockedreward" class="image-reward" src="@/assets/images/videolocked.png" />
</template>

<style scoped>
a {
  height: 50px;
}
</style>
