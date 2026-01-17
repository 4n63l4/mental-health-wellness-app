<template>
  <section class="home">
    <h1 class="title">{{ greetingMessage }}</h1>
    <p class="subtitle">
      This is a safe space to explore resources, tools, and support for your mental health.
    </p>

    <!-- Navigation links -->
    <div class="links">
      <router-link class="link" to="/breathing">🌬️ Breathing Exercises</router-link>
      <router-link class="link" to="/wellness">🌱 Wellness Tips</router-link>
      <router-link class="link" to="/ai-support">🤖 AI Support</router-link>
    </div>

    <!-- Motivational quote -->
    <div class="quote-box">
      <transition name="fade">
        <p key="quote" class="quote">"{{ currentQuote }}"</p>
      </transition>
      <button @click="nextQuote">✨ Get Inspired</button>
    </div>

    <!-- Mood selector -->
    <div class="mood-box glass-card">
      <h3>How are you feeling today?</h3>
      <div class="mood-options">
        <button @click="setMood('😊')">😊 Happy</button>
        <button @click="setMood('😔')">😔 Sad</button>
        <button @click="setMood('😌')">😌 Calm</button>
        <button @click="setMood('😣')">😣 Stressed</button>
      </div>
      <p v-if="moodMessage" class="mood-message">{{ moodMessage }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Greeting based on time of day
const hours = new Date().getHours()
let greetingMessage = "Welcome to Mental Health Wellness"
if (hours < 12) greetingMessage = "🌞 Good Morning! Welcome to Mental Health Wellness"
else if (hours < 18) greetingMessage = "🌤️ Good Afternoon! Welcome to Mental Health Wellness"
else greetingMessage = "🌙 Good Evening! Welcome to Mental Health Wellness"

// Motivational quotes
const quotes = [
  "Take a deep breath, you are stronger than you think.",
  "Small steps every day lead to big changes.",
  "Your mental health matters — be kind to yourself.",
  "Progress, not perfection, is the goal."
]

const currentQuote = ref(quotes[0])
function nextQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  currentQuote.value = quotes[randomIndex]
}

// Mood selector
const moodMessage = ref('')
function setMood(mood) {
  switch (mood) {
    case '😊':
      moodMessage.value = "That's wonderful! Keep spreading positivity 🌟"
      break
    case '😔':
      moodMessage.value = "It's okay to feel sad. Be gentle with yourself 💙"
      break
    case '😌':
      moodMessage.value = "Enjoy the calm — it's a gift 🌿"
      break
    case '😣':
      moodMessage.value = "Take a deep breath. You're capable of handling this 💪"
      break
  }
}
</script>
<style scoped>
.home {
  text-align: center;
  padding: 2.5rem;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1.2s ease-in-out;
}

/* Smooth fade-in for the whole page */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 3px 10px rgba(0,0,0,0.25);
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.3rem;
  color: #f8fafc;
  max-width: 600px;
  margin-bottom: 2rem;
}

.links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.link {
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(12px);
  padding: 1rem 1.5rem;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
}

.link:hover {
  transform: translateY(-4px) scale(1.08);
  background: rgba(255,255,255,0.35);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.quote-box {
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 500px;
}

.quote {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 1rem;
  color: #fff;
}

button {
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  color: #2563eb;
  border: none;
  padding: 0.7rem 1.4rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

button:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #fff;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}

.mood-box {
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 16px;
  max-width: 420px;
}

.glass-card {
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(14px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.mood-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.2rem;
}

.mood-options button {
  background: rgba(255,255,255,0.25);
  color: #fff;
  font-size: 1rem;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  transition: transform 0.3s, background 0.3s;
}

.mood-options button:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1);
}

.mood-message {
  margin-top: 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  animation: fadeIn 0.8s ease-in-out;
}

/* Quote fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
