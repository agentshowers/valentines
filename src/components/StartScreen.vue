<script setup lang="ts">
import { Game } from '@/assets/gameLogic'

defineProps<{
  game?: Game
}>()

defineEmits(['start-game', 'continue-game'])
</script>

<template>
  <div class="wrapper">
    <img alt="Castles of Liz" class="logo" src="@/assets/images/banner.png" />
    <div class="village-container">
      <img alt="Village" class="village" src="@/assets/images/village.png" />
    </div>

    <button @click="$emit('start-game')" class="home-button button">New game</button>
    <button v-if="game" @click="$emit('continue-game')" class="home-button button">
      Continue game
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100%;
}

.village-container {
  padding: 10px;
}

.village {
  border: 5px solid #ffd700;
  width: 100%;
}

.home-button {
  margin-top: 20px;
  padding: 10px;
}
</style>
