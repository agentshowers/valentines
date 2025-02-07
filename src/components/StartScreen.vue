<script setup lang="ts">
defineEmits(['start-game'])
</script>

<template>
  <div class="wrapper">
    <img alt="Castles of Liz" class="logo" src="@/assets/images/banner.png" />
    <div class="village-container">
      <img alt="Village" class="village" src="@/assets/images/village.png" />
    </div>

    <button @click="$emit('start-game')" class="start-button">Start the game</button>
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

.start-button {
  margin-top: 25px;
}
</style>
