<script setup lang="ts">
import HexagonTile from './HexagonTile.vue'
import { ref } from 'vue'

class Hexagon {
  color: string
  filled: boolean

  constructor(color: string, filled: boolean = false) {
    this.color = color
    this.filled = filled
  }
}

function initialStatus() {
  return [
    new Hexagon('red'),
    new Hexagon('red'),
    new Hexagon('red'),
    new Hexagon('green'),
    new Hexagon('green'),
    new Hexagon('green'),
    new Hexagon('green'),
    new Hexagon('blue'),
    new Hexagon('blue'),
    new Hexagon('blue'),
    new Hexagon('blue'),
    new Hexagon('blue'),
    new Hexagon('yellow'),
    new Hexagon('yellow'),
    new Hexagon('yellow'),
    new Hexagon('yellow'),
    new Hexagon('purple'),
    new Hexagon('purple'),
    new Hexagon('purple'),
  ]
}

const hexagons = ref(initialStatus())
</script>

<template>
  <div class="game">
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in hexagons.slice(0, 3)" :key="index">
        <HexagonTile :color="hexagon.color" :filled="hexagon.filled" />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in hexagons.slice(3, 7)" :key="index + 3">
        <HexagonTile :color="hexagon.color" :filled="hexagon.filled" />
      </div>
    </div>
    <div class="hexagon-row row-5">
      <div v-for="(hexagon, index) in hexagons.slice(7, 12)" :key="index + 7">
        <HexagonTile :color="hexagon.color" :filled="hexagon.filled" />
      </div>
    </div>
    <div class="hexagon-row row-4">
      <div v-for="(hexagon, index) in hexagons.slice(12, 16)" :key="index + 12">
        <HexagonTile :color="hexagon.color" :filled="hexagon.filled" />
      </div>
    </div>
    <div class="hexagon-row row-3">
      <div v-for="(hexagon, index) in hexagons.slice(16, 19)" :key="index + 16">
        <HexagonTile :color="hexagon.color" :filled="hexagon.filled" />
      </div>
    </div>
  </div>
</template>
