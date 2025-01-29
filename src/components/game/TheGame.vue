<script setup lang="ts">
import HexagonTile from './HexagonTile.vue'
import DiceRoller from './DiceRoller.vue'
import { ref } from 'vue'

class Hexagon {
  color: string
  filled: boolean

  constructor(color: string, filled: boolean = false) {
    this.color = color
    this.filled = filled
  }
}

class State {
  hexagons: Hexagon[]
  workers: number
  reRolls: number
  coins: number
  dice: number

  constructor(hexagons: Hexagon[], workers: number, reRolls: number, coins: number, dice: number) {
    this.hexagons = hexagons
    this.workers = workers
    this.reRolls = reRolls
    this.coins = coins
    this.dice = dice
  }

  static defaultState() {
    return new State(
      [
        new Hexagon('blue'),
        new Hexagon('blue'),
        new Hexagon('yellow', true),
        new Hexagon('blue', true),
        new Hexagon('blue'),
        new Hexagon('yellow'),
        new Hexagon('yellow'),
        new Hexagon('yellow'),
        new Hexagon('yellow'),
        new Hexagon('green'),
        new Hexagon('yellow'),
        new Hexagon('blue'),
        new Hexagon('yellow'),
        new Hexagon('green'),
        new Hexagon('green'),
        new Hexagon('blue'),
        new Hexagon('yellow'),
        new Hexagon('blue'),
        new Hexagon('blue'),
      ],
      0,
      0,
      0,
      6,
    )
  }
}

const state = ref(State.defaultState())

function rollDice() {
  state.value.dice = Math.floor(Math.random() * 6) + 1
}
</script>

<template>
  <div class="game-board">
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in state.hexagons.slice(0, 3)" :key="index">
        <HexagonTile v-bind="hexagon" />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in state.hexagons.slice(3, 7)" :key="index + 3">
        <HexagonTile v-bind="hexagon" />
      </div>
    </div>
    <div class="hexagon-row row-5">
      <div v-for="(hexagon, index) in state.hexagons.slice(7, 12)" :key="index + 7">
        <HexagonTile v-bind="hexagon" />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in state.hexagons.slice(12, 16)" :key="index + 12">
        <HexagonTile v-bind="hexagon" />
      </div>
    </div>
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in state.hexagons.slice(16, 19)" :key="index + 16">
        <HexagonTile v-bind="hexagon" />
      </div>
    </div>
  </div>
  <div class="game-footer">
    <div class="game-state">
      <p>Workers: {{ state.workers }}</p>
      <p>Re-rolls: {{ state.reRolls }}</p>
      <p>Coins: {{ state.coins }}</p>
    </div>
    <div class="dice-area">
      <DiceRoller @rollDice="rollDice" :allowRoll="true" :diceValue="state.dice" />
    </div>
    <div class="buy-area">Buy</div>
  </div>
</template>

<style scoped>
.game-board {
  margin-top: 50px;
}
.game-footer {
  display: flex;
  margin-top: 50px;
}
.game-state {
  width: 25%;
}
.dice-area {
  width: 50%;
}
.buy-area {
  width: 25%;
}
</style>
