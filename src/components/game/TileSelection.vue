<script setup lang="ts">
import DiceRoller from './DiceRoller.vue'
import BuyTile from './BuyTile.vue'
import TilePicker from './TilePicker.vue'
import { Game, GameState } from '@/assets/gameLogic'

defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="selection-container">
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
      <div class="tile-picker-row">
        <TilePicker :game="game" :value="1" />
        <TilePicker :game="game" :value="2" />
        <TilePicker :game="game" :value="3" />
      </div>
      <div class="tile-picker-row">
        <TilePicker :game="game" :value="4" />
        <TilePicker :game="game" :value="5" />
        <TilePicker :game="game" :value="6" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.selection-container {
  display: flex;
  padding: 0px 20px;
  height: inherit;
}

.dice-area {
  width: 25%;
}

.tile-buying {
  display: flex;
  gap: 20px;
  margin-left: 50px;
}

.tile-picking {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tile-picker-row {
  display: flex;
}
</style>
