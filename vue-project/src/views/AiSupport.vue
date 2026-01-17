<template>
  <section class="wrap">
    <h1>AI Support</h1>
    <p class="sub">
      Put what’s on your mind into words. Get gentle, practical ideas to help you take one step forward.
    </p>

    <!-- Mode Switch -->
    <div class="mode-switch">
      <label>
        <input type="checkbox" v-model="onlineMode" />
        {{ onlineMode ? "🌐 Online AI" : "📴 Offline Mode" }}
      </label>
    </div>

    <div class="support-box card">
      <textarea
        v-model="userInput"
        :maxlength="maxChars"
        placeholder="Write your thoughts here..."
      ></textarea>
      <p class="char-count" :class="{ warning: remainingChars <= 20 }">
        {{ remainingChars }} characters left
      </p>
      <button @click="respond" :disabled="!isValid">Send</button>

      <!-- Conversation history -->
      <div v-if="history.length" class="history">
        <h3>Conversation</h3>
        <ul>
          <li v-for="(item, index) in history" :key="index">
            <strong>You:</strong> {{ item.input }} <br />
            <strong>AI:</strong> {{ item.output }}

            <!-- Emoji reactions -->
            <div class="reactions">
              <button @click="addReaction(index, '👍')">👍</button>
              <button @click="addReaction(index, '❤️')">❤️</button>
              <button @click="addReaction(index, '😊')">😊</button>
              <button @click="addReaction(index, '🙏')">🙏</button>
            </div>

            <!-- Show selected reaction -->
            <p v-if="item.reaction" class="reaction-display">
              You reacted: {{ item.reaction }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAiMessage } from '@/services/aiService'

// State
const userInput = ref('')
const history = ref([])
const onlineMode = ref(true) // default: Online AI
const maxChars = 200

// Computed validation
const remainingChars = computed(() => maxChars - userInput.value.length)
const isValid = computed(() => userInput.value.trim().length > 0 && userInput.value.length <= maxChars)

// Offline fallback suggestions
const fallbackSuggestions = [
  "Take a short walk and breathe deeply.",
  "Write down one positive thing about today.",
  "Reach out to a friend or loved one.",
  "Pause for a moment of mindfulness."
]

async function respond() {
  if (!isValid.value) return

  let output
  if (onlineMode.value) {
    // Online AI mode
    output = await getAiMessage(userInput.value)
  } else {
    // Offline mode: random fallback suggestion
    const randomIndex = Math.floor(Math.random() * fallbackSuggestions.length)
    output = fallbackSuggestions[randomIndex]
  }

  history.value.push({ input: userInput.value, output, reaction: null })
  userInput.value = ''
}

function addReaction(index, emoji) {
  history.value[index].reaction = emoji
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

.mode-switch {
  margin-top: 1rem;
  font-size: 1rem;
  color: #2563eb;
  font-weight: 600;
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

.char-count {
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
}

.char-count.warning {
  color: #dc2626;
  font-weight: 600;
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

.reactions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.reactions button {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.reactions button:hover {
  transform: scale(1.2);
}

.reaction-display {
  margin-top: 0.3rem;
  font-size: 0.95rem;
  color: #2563eb;
  font-weight: 600;
}
</style>
