// Replace with your OpenAI API key
const API_KEY = "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";

console.log("Hello, I am Lexo. How can I help you?");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  
  input.value = "";
  const lowerText = userText.toLowerCase();

  // Predefined custom responses
  if (
    lowerText.includes("who made you") ||
    lowerText.includes("who created you") ||
    lowerText.includes("who built you") ||
    lowerText.includes("who developed you") ||
    lowerText.includes("who programmed you") ||
    lowerText.includes("who is your creator") ||
    lowerText.includes("who is your developer")
  ) {
    addMessage("I was built by TEMID TECH. A tech company founded by a young and brilliant mind, ADEDIGBA OPEYEMI. He created me to help people learn, chat, and explore AI technology.", "bot");
    return;
  }
  if (
    lowerText.includes("who is adedigba opeyemi")
  ) {
    addMessage("Adedigba Opeyemi is my developer and the founder of TemiD Tech. A young, brilliant and talented mind hoping to reshape the technology world and make great impacts.", "bot");
    return;
  }
  if (
    lowerText.includes("do you know adedigba opeyemi")
  ) {
    addMessage("Adedigba Opeyemi is my developer and the founder of TemiD Tech. A young, brilliant and talented mind hoping to reshape the technology world and make great impacts.", "bot");
    return;
  }
  if (
    lowerText.includes("hi")||
    lowerText.includes("hello")
  ) {
    addMessage("Hello! How can I help you today", "bot");
    return;
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or "gpt-3.5-turbo", or "gpt-4" depending on access
        messages: [
          { role: "system", content: "You are Lexo, a helpful AI assistant." },
          { role: "user", content: userText }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't understand.";
    addMessage(botText, "bot");

  } catch (error) {
    addMessage("Error connecting to AI: " + error.message, "bot");
  }
}

// Adds message to chat window
function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

window.onload = function () {
  addMessage("Hi! I'm Lexo, Ask me anything!", "bot");

};


