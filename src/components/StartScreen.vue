<script setup lang="ts">
defineEmits(['start-game'])
</script>

<template>
  <div class="greetings">
    <h1>Castles of Liz</h1>
    <img alt="Liz" class="logo" src="../assets/liz.png" width="100px" />
  </div>
  <button @click="$emit('start-game')">Start the game</button>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings {
  display: flex;
}

.greetings h1 {
  text-align: center;
}
</style>
