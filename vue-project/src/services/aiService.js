// src/services/aiService.js
import { fallbackMessages } from './fallbackMessages'


export async function getAiMessage(prompt) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ Groq model
        messages: [
          { role: "system", content: "You are a supportive mental health companion." },
          { role: "user", content: prompt }
        ]
      })
    })

    const result = await response.json()

    if (result?.choices?.length && result.choices[0].message?.content) {
      return result.choices[0].message.content.trim()
    }

    throw new Error("Invalid AI response")
  } catch (error) {
    console.warn("AI API failed, using fallback:", error)
    const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
    return random
  }
}
