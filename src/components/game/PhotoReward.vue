<script setup lang="ts">
import { Game } from '@/gameLogic'

defineProps<{
  game: Game
  index: number
}>()

function photoUrl(index: number) {
  const path = `../assets/memories/photos/${index}.jpg`
  return new URL(path, import.meta.url).href
}
</script>

<template>
  <a v-if="game.photosUnlocked > index" :href="photoUrl(index)" target="_blank">
    <img alt="reward" class="image-reward" src="@/assets/images/photoreward.png" />
  </a>
  <img v-else alt="lockedreward" class="image-reward" src="@/assets/images/photolocked.png" />
</template>

<style scoped>
a {
  height: 50px;
}
</style>
