<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'

const props = defineProps<{
  value: number
  ratio: number
}>()

const dice = useTemplateRef('dice')

watchEffect(() => {
  updateDice(props.value)
})

function updateDice(value: number) {
  if (!dice.value) {
    return
  }
  for (let i = 1; i <= 6; i++) {
    dice.value.classList.remove('show-' + i)
    if (value === i) {
      dice.value.classList.add('show-' + i)
    }
  }
}
</script>

<template>
  <div ref="dice" class="dice">
    <div class="side one">
      <div class="dot one-1"></div>
    </div>
    <div class="side two">
      <div class="dot two-1"></div>
      <div class="dot two-2"></div>
    </div>
    <div class="side three">
      <div class="dot three-1"></div>
      <div class="dot three-2"></div>
      <div class="dot three-3"></div>
    </div>
    <div class="side four">
      <div class="dot four-1"></div>
      <div class="dot four-2"></div>
      <div class="dot four-3"></div>
      <div class="dot four-4"></div>
    </div>
    <div class="side five">
      <div class="dot five-1"></div>
      <div class="dot five-2"></div>
      <div class="dot five-3"></div>
      <div class="dot five-4"></div>
      <div class="dot five-5"></div>
    </div>
    <div class="side six">
      <div class="dot six-1"></div>
      <div class="dot six-2"></div>
      <div class="dot six-3"></div>
      <div class="dot six-4"></div>
      <div class="dot six-5"></div>
      <div class="dot six-6"></div>
    </div>
  </div>
</template>

<style scoped>
.dice {
  width: calc(v-bind(ratio) * 75px);
  height: calc(v-bind(ratio) * 75px);
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.dot {
  position: absolute;
  width: calc(v-bind(ratio) * 15px);
  height: calc(v-bind(ratio) * 15px);
  margin-top: calc(v-bind(ratio) * -8px);
  margin-right: calc(v-bind(ratio) * 4px);
  margin-bottom: calc(v-bind(ratio) * 4px);
  margin-left: calc(v-bind(ratio) * -8px);
  border-radius: calc(v-bind(ratio) * 15px);
  background-color: #f25f5c;
  box-shadow: inset 2px 2px #d90429;
}

.side {
  position: absolute;
  background-color: #fff;
  border-radius: 5px;
  width: calc(v-bind(ratio) * 75px);
  height: calc(v-bind(ratio) * 75px);
  border: 1px solid #e5e5e5;
  text-align: center;
  line-height: calc(v-bind(ratio) * 1.5em);
}

.side:nth-child(1) {
  transform: translateZ(calc(v-bind(ratio) * 2.3em));
}

.side:nth-child(6) {
  transform: rotateY(90deg) translateZ(calc(v-bind(ratio) * 2.3em));
}

.side:nth-child(3) {
  transform: rotateY(-90deg) translateZ(calc(v-bind(ratio) * 2.3em));
}

.side:nth-child(4) {
  transform: rotateX(90deg) translateZ(calc(v-bind(ratio) * 2.3em));
}

.side:nth-child(5) {
  transform: rotateX(-90deg) translateZ(calc(v-bind(ratio) * 2.3em));
}

.side:nth-child(2) {
  transform: rotateY(-180deg) translateZ(calc(v-bind(ratio) * 2.3em));
}

.show-1 {
  transform: rotateX(720deg) rotateZ(-720deg);
}

.show-2 {
  transform: rotateX(-900deg) rotateZ(1080deg);
}

.show-6 {
  transform: rotateY(-450deg) rotateZ(-1440deg);
}

.show-3 {
  transform: rotateY(810deg) rotateZ(720deg);
}

.show-4 {
  transform: rotateX(-810deg) rotateZ(-1080deg);
}

.show-5 {
  transform: rotateX(450deg) rotateZ(-720deg);
}

.two-1,
.three-1,
.four-1,
.five-1,
.six-1 {
  top: 20%;
  left: 20%;
}

.four-3,
.five-3,
.six-4 {
  top: 20%;
  left: 80%;
}

.one-1,
.three-2,
.five-5 {
  top: 50%;
  left: 50%;
}

.four-2,
.five-2,
.six-3 {
  top: 80%;
  left: 20%;
}

.two-2,
.three-3,
.four-4,
.five-4,
.six-6 {
  top: 80%;
  left: 80%;
}

.six-2 {
  top: 50%;
  left: 20%;
}

.six-5 {
  top: 50%;
  left: 80%;
}
</style>
