<script setup lang="ts">
defineProps(['text'])
defineEmits(['start-game'])
</script>

<template>
  <button @click="$emit('start-game')">{{ text }}</button>
</template>

<style scoped></style>
