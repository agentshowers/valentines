<script setup lang="ts">
import Header from './components/MainHeader.vue'
import StartGame from './components/StartGame.vue'
import TheGame from './components/game/TheGame.vue'
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <Header msg="You did it!" />
    </div>
  </header>

  <main>
    <TheGame v-if="started" />
    <StartGame v-else text="Start the game" @start-game="started = true" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
