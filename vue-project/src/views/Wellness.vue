<template>
  <section class="wellness">
    <h2>Wellness Check-ins</h2>
    <p>Take a moment for yourself with a daily tip and reflection prompt.</p>

    <!-- Daily Tip -->
    <div class="card tip-box">
      <h3>🌱 Daily Tip</h3>
      <p>{{ currentTip }}</p>
      <button @click="nextTip">Get Another Tip</button>
    </div>

    <!-- Reflection Prompt -->
    <div class="card reflection-box">
      <h3>📝 Reflection Prompt</h3>
      <p>{{ currentPrompt }}</p>
      <button @click="nextPrompt">New Prompt</button>
    </div>

    <!-- Gratitude Journal -->
    <div class="card gratitude-box">
      <h3>💖 Gratitude Journal</h3>
      <textarea
        v-model="gratitudeEntry"
        placeholder="Write one thing you're grateful for today..."
      ></textarea>
      <button @click="saveGratitude" :disabled="!gratitudeEntry">Save Entry</button>

      <ul v-if="gratitudeList.length" class="gratitude-list">
        <li v-for="(item, index) in gratitudeList" :key="index">✨ {{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Tips and prompts
const tips = [
  "Drink a glass of water to refresh your body.",
  "Take a short walk to clear your mind.",
  "Write down one thing you're grateful for today.",
  "Pause for 5 minutes of mindful breathing."
]

const prompts = [
  "What made you smile today?",
  "How are you feeling right now?",
  "What’s one small step you can take toward self-care?",
  "What’s something you’d like to let go of?"
]

// Daily tip based on date
const todayIndex = new Date().getDate() % tips.length
const currentTip = ref(tips[todayIndex])
const currentPrompt = ref(prompts[0])

function nextTip() {
  const randomIndex = Math.floor(Math.random() * tips.length)
  currentTip.value = tips[randomIndex]
}

function nextPrompt() {
  const randomIndex = Math.floor(Math.random() * prompts.length)
  currentPrompt.value = prompts[randomIndex]
}

// Gratitude journal
const gratitudeEntry = ref('')
const gratitudeList = ref([])

function saveGratitude() {
  gratitudeList.value.push(gratitudeEntry.value)
  gratitudeEntry.value = ''
}
</script>

<style scoped>
.wellness {
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f0f9ff, #ecfdf5);
  min-height: 100vh;
}

.card {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

h3 {
  margin-bottom: 0.5rem;
  color: #2563eb;
}

button {
  margin-top: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
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

textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
}

.gratitude-list {
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}

.gratitude-list li {
  text-align: left;
  margin: 0.3rem 0;
  font-size: 1rem;
  color: #374151;
}
</style>
