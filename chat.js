// Replace with your free Gemini API key from Google AI Studio
// Get it here: https://aistudio.google.com/app/apikey
const API_KEY = "AIzaSyCAbaPuKWUkVQd1E-p_mSI1zVm1-AiyIg0";

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
    addMessage(
      "I was built by TEMID TECH. A tech company founded by a young and brilliant mind, ADEDIGBA OPEYEMI. He created me to help people learn, chat, and explore AI technology.",
      "bot"
    );
    return;
  }

  if (lowerText.includes("who is adedigba opeyemi") || lowerText.includes("do you know adedigba opeyemi")) {
    addMessage(
      "Adedigba Opeyemi is my developer and the founder of TemiD Tech. A young, brilliant and talented mind hoping to reshape the technology world and make great impacts.",
      "bot"
    );
    return;
  }

  try {
    showTyping();
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const botText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I couldn't understand.";
    hideTyping();
typeMessage(botText, "bot");

  } catch (error) {
    addMessage("Error connecting to Gemini: " + error.message, "bot");
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
// Show "Lexo is typing..." message
function showTyping() {
  const chat = document.getElementById("chat");
  const typingDiv = document.createElement("div");
  typingDiv.id = "typing";
  typingDiv.classList.add("message", "bot");
  typingDiv.textContent = "Lexo is typing...";
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;
}

// Remove the typing message
function hideTyping() {
  const typingDiv = document.getElementById("typing");
  if (typingDiv) typingDiv.remove();
}

// Type out bot message like a human
function typeMessage(text, sender) {
  const chat = document.getElementById("chat");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  chat.appendChild(messageDiv);

  let i = 0;
  const speed = 30; // typing speed in ms

  function type() {
    if (i < text.length) {
      messageDiv.textContent += text.charAt(i);
      chat.scrollTop = chat.scrollHeight;
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
// Clear all chat messages
function clearChat() {
  const chat = document.getElementById("chat");
  chat.innerHTML = "";
  addMessage("Hi! I'm Lexo, Ask me anything!", "bot"); // reset greeting
}

// Toggle between light & dark background
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
// Clear Chat
document.getElementById("clearChat").addEventListener("click", () => {
  clearChat(); // use your existing function
  document.getElementById("menu-dropdown").classList.add("hidden");
});

// Toggle Theme
document.getElementById("toggleTheme").addEventListener("click", () => {
  toggleTheme(); // use your existing function
  document.getElementById("menu-dropdown").classList.add("hidden");
});

// Hamburger Menu Toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("menu-dropdown").classList.toggle("hidden");
});
// Save chat to memory
function saveChat() {
  const chat = document.getElementById("chat").innerHTML;
  localStorage.setItem("lexoChat", chat);
}

// Load chat from memory on page load
window.onload = function () {
  const savedChat = localStorage.getItem("lexoChat");
  if (savedChat) {
    document.getElementById("chat").innerHTML = savedChat;
  } else {
    addMessage("Hi! I'm Lexo, Ask me anything!", "bot");
  }
};
saveChat();
window.onload = function () {
  addMessage("Hi! I'm Lexo, Ask me anything!", "bot");

};

