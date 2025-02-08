<script setup lang="ts">
import { HexagonState } from '@/assets/gameLogic'
const props = defineProps<{
  color: string
  state: HexagonState
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
    class="hexagon-tile"
    :style="{ opacity: opacity(), backgroundColor: color }"
    @click="handleClick"
  ></div>
</template>

<style scoped></style>
