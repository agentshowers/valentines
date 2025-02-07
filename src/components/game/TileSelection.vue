<script setup lang="ts">
import DiceRoller from './DiceRoller.vue'
import BuyTile from './BuyTile.vue'
import { Game, GameState } from '@/gameLogic'

defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="container">
    <div class="dice-area">
      <DiceRoller :allowRoll="game.state === GameState.RollOrBuy" :game="game" />
    </div>
    <div v-if="game.state === GameState.RollOrBuy" class="tile-buying">
      <div>
        <BuyTile :color="'yellow'" :game="game" />
      </div>
      <div>
        <BuyTile :color="'blue'" :game="game" />
      </div>
      <div>
        <BuyTile :color="'green'" :game="game" />
      </div>
    </div>
    <div v-else class="tile-picking">
      <div class="row">
        <button :disabled="!game.canPick(1)" @click="game.pickTile(1)">Pick Yellow</button>
        <button :disabled="!game.canPick(2)" @click="game.pickTile(2)">Pick Blue</button>
        <button :disabled="!game.canPick(3)" @click="game.pickTile(3)">Pick Green</button>
      </div>
      <div class="row">
        <button :disabled="!game.canPick(4)" @click="game.pickTile(4)">Pick Yellow</button>
        <button :disabled="!game.canPick(5)" @click="game.pickTile(5)">Pick Blue</button>
        <button :disabled="!game.canPick(6)" @click="game.pickTile(6)">Pick Green</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 25px;
  justify-content: center;
}

.dice-area {
  width: 25%;
}

.tile-buying {
  display: flex;
  gap: 20px;
}

.tile-picking {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  gap: 25px;
}
</style>
