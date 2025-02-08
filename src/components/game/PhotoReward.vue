<script setup lang="ts">
import { Game } from '@/assets/gameLogic'
import { PHOTOS } from '@/assets/memories'

defineProps<{
  game: Game
  index: number
}>()
</script>

<template>
  <a v-if="game.photosUnlocked > index" :href="PHOTOS[index]" target="_blank">
    <img alt="reward" class="image-reward" src="@/assets/images/photoreward.png" />
  </a>
  <img v-else alt="lockedreward" class="image-reward" src="@/assets/images/photolocked.png" />
</template>

<style scoped>
a {
  height: 50px;
}
</style>
