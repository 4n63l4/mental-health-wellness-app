<template>
  <section class="breathing">
    <h2>Breathing Exercises</h2>
    <p>Follow the guide below to practice mindful breathing.</p>

    <div class="exercise card">
      <!-- Animated breathing circle -->
      <div class="circle" :class="animationClass"></div>

      <p class="instruction">{{ instruction }}</p>

      <!-- Cycle selector -->
      <div class="selector">
        <label>
          Number of cycles:
          <select v-model="targetCycles" :disabled="isRunning">
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
      </div>

      <!-- Timer -->
      <p v-if="isRunning" class="timer">⏱️ Time: {{ elapsedTime }}s</p>

      <button @click="startExercise" :disabled="isRunning">
        {{ isRunning ? 'Exercise Running...' : 'Start Breathing Exercise' }}
      </button>

      <p v-if="cycleCount > 0" class="cycles">Completed cycles: {{ cycleCount }}</p>

      <!-- Background sound toggle -->
      <button class="sound-btn" @click="toggleSound">
        {{ soundOn ? '🔊 Sound On' : '🔇 Sound Off' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const instruction = ref('Click start to begin.')
const isRunning = ref(false)
const cycleCount = ref(0)
const targetCycles = ref(1)
const animationClass = ref('')
const elapsedTime = ref(0)
const soundOn = ref(false)
let timerInterval = null

function startExercise() {
  isRunning.value = true
  cycleCount.value = 0
  elapsedTime.value = 0

  timerInterval = setInterval(() => {
    elapsedTime.value++
  }, 1000)

  runCycle()
}

function runCycle() {
  const steps = [
    { text: 'Inhale deeply...', animation: 'inhale' },
    { text: 'Hold your breath...', animation: 'hold' },
    { text: 'Exhale slowly...', animation: 'exhale' },
    { text: 'Rest...', animation: 'rest' }
  ]
  let index = 0

  instruction.value = steps[index].text
  animationClass.value = steps[index].animation

  const interval = setInterval(() => {
    index++
    if (index < steps.length) {
      instruction.value = steps[index].text
      animationClass.value = steps[index].animation
    } else {
      clearInterval(interval)
      cycleCount.value++
      if (cycleCount.value < targetCycles.value) {
        runCycle()
      } else {
        instruction.value = 'Well done! You completed your session.'
        animationClass.value = ''
        isRunning.value = false
        clearInterval(timerInterval)
      }
    }
  }, 4000)
}

function toggleSound() {
  soundOn.value = !soundOn.value
}
</script>

<style scoped>
.breathing {
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #e0f7fa, #f1f8e9);
  min-height: 100vh;
}

.card {
  margin: 2rem auto;
  padding: 2rem;
  max-width: 400px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.instruction {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.5rem 0;
}

/* Breathing circle */
.circle {
  width: 140px;
  height: 140px;
  margin: 1.5rem auto;
  border-radius: 50%;
  background: #2563eb;
  transition: all 4s ease-in-out;
  box-shadow: 0 0 20px rgba(37,99,235,0.6);
}

/* Animation states */
.inhale {
  transform: scale(1.5);
  background: #3b82f6;
}

.hold {
  transform: scale(1.5);
  background: #1e40af;
}

.exhale {
  transform: scale(0.8);
  background: #60a5fa;
}

.rest {
  transform: scale(1);
  background: #93c5fd;
}

.selector {
  margin: 1rem 0;
}

.timer {
  margin: 1rem 0;
  font-size: 1.1rem;
  color: #444;
}

button {
  margin-top: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

button:hover:not(:disabled) {
  background: #1e40af;
  transform: scale(1.05);
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.sound-btn {
  margin-top: 1.5rem;
}

.cycles {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #333;
}
</style>
