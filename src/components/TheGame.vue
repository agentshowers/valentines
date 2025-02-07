<script setup lang="ts">
import HexagonTile from './game/HexagonTile.vue'
import DiceRoller from './game/DiceRoller.vue'
import BuyTile from './game/BuyTile.vue'

import { ref } from 'vue'
import { Game, GameState, HexagonState, Reward } from '@/gameLogic'

const game = ref(Game.newGame())
</script>

<template>
  <div class="game-board">
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in game.hexagons.slice(0, 3)" :key="index">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index)"
        />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in game.hexagons.slice(3, 7)" :key="index + 3">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 3)"
        />
      </div>
    </div>
    <div class="hexagon-row row-5">
      <div v-for="(hexagon, index) in game.hexagons.slice(7, 12)" :key="index + 7">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 7)"
        />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in game.hexagons.slice(12, 16)" :key="index + 12">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 12)"
        />
      </div>
    </div>
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in game.hexagons.slice(16, 19)" :key="index + 16">
        <HexagonTile
          :color="hexagon.color"
          :state="hexagon.displayState(game.selectedColor)"
          @place-tile="game.placeTile(index + 16)"
        />
      </div>
    </div>
  </div>
  <div class="game-controls">
    <div v-if="game.state === GameState.RollOrBuy" class="roll-or-buy">
      <div class="dice-area">
        <DiceRoller :allowRoll="true" :game="game" />
      </div>
      <div class="buy-area">
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
    </div>
    <div v-else-if="game.state === GameState.TileSelection">
      <div class="pick-area">Pick</div>
    </div>
    <div v-else-if="game.state === GameState.TilePlacement" class="tile-placement">
      <HexagonTile :color="game.selectedColor!" :state="HexagonState.Filled" />
      Place the tile on the board
    </div>
    <div v-else-if="game.state === GameState.TileReward" class="tile-reward">
      <div v-if="game.reward === Reward.Coin">You got a coin!</div>
      <div v-else-if="game.reward === Reward.Workers">You got 2 workers!</div>
      <div v-else-if="game.reward === Reward.Memory">You unlocked a memory!</div>
      <button @click="game.acceptTileReward()">Yay</button>
    </div>
    <div v-else-if="game.state === GameState.RegionReward" class="region-reward">
      <div>You completed a region!</div>
      <button @click="game.acceptRegionReward()">Yay</button>
    </div>
  </div>
  <div class="game-state">
    <p>Workers: {{ game.workers }}</p>
    <p>Coins: {{ game.coins }}</p>
  </div>
</template>

<style scoped>
.game-board {
  margin-top: 20px;
}

.game-controls {
  margin-top: 50px;
}

.roll-or-buy {
  display: flex;
  gap: 25px;
}

.dice-area {
  width: 25%;
}

.pick-area {
  width: 50%;
}

.buy-area {
  display: flex;
  gap: 20px;
}

.tile-placement {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.tile-reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.region-reward {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.game-state {
  display: flex;
  position: absolute;
  bottom: 10%;
  gap: 25px;
}
</style>
