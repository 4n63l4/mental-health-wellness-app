<template>
  <section class="wrap">
    <h1>AI Support</h1>
    <p class="sub">
      Put what’s on your mind into words. Get gentle, practical ideas to help you take one step forward.
    </p>

    <div class="support-box card">
      <textarea
        v-model="userInput"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button @click="respond" :disabled="!userInput">Get Support</button>

      <!-- Conversation history -->
      <div v-if="history.length" class="history">
        <h3>🗨️ Conversation</h3>
        <ul>
          <li v-for="(item, index) in history" :key="index">
            <strong>You:</strong> {{ item.input }} <br />
            <strong>AI:</strong> {{ item.output }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const userInput = ref('')
const history = ref([])

function respond() {
  const suggestions = [
    "Take a short walk and breathe deeply.",
    "Write down one positive thing about today.",
    "Reach out to a friend or loved one.",
    "Pause for a moment of mindfulness."
  ]
  const randomIndex = Math.floor(Math.random() * suggestions.length)
  const output = suggestions[randomIndex]

  // Save to conversation history
  history.value.push({ input: userInput.value, output })
  userInput.value = ''
}
</script>

<style scoped>
.wrap {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff, #ecfdf5);
  min-height: 100vh;
}

.sub {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #555;
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
  transform: scale(1.02);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

textarea {
  width: 100%;
  height: 100px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
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

.history {
  margin-top: 2rem;
  text-align: left;
}

.history h3 {
  margin-bottom: 0.5rem;
  color: #2563eb;
}

.history ul {
  list-style: none;
  padding: 0;
}

.history li {
  margin-bottom: 1rem;
  background: #f9fafb;
  padding: 0.8rem;
  border-radius: 6px;
}
</style>
