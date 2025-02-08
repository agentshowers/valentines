<script setup lang="ts">
import { HexagonState } from '@/assets/gameLogic'
const props = defineProps<{
  color: string
  state: HexagonState
  customClass?: string
}>()

const emit = defineEmits(['placeTile'])

function opacity() {
  if (props.state === HexagonState.Filled) {
    return 1
  } else if (props.state === HexagonState.Empty) {
    return 0.3
  } else if (props.state === HexagonState.Placeable) {
    return 0.5
  }
  return 0.1
}

function handleClick() {
  if (props.state === HexagonState.Placeable) {
    emit('placeTile')
  }
}
</script>

<template>
  <div
    :class="'hexagon-tile ' + (customClass ? customClass : '')"
    :style="{ opacity: opacity(), backgroundColor: color }"
    @click="handleClick"
  ></div>
</template>

<style scoped>
.hexagon-tile {
  width: var(--hex-width);
  margin: var(--hex-margin);
  height: calc(var(--hex-width) * 1.1547);
  font-size: initial; /* we reset the font-size if we want to add some content */
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
}

.picker {
  width: 50px;
  height: calc(50px * 1.1547);
}
</style>
