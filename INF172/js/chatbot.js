// Dummy conversation data for each chat
const chatConversations = {
    "Chat 1": [
        { sender: "bot", text: "Welcome to Chat 1! How can I help you today?" }
    ],
    "Chat 2": [
        { sender: "bot", text: "This is Chat 2. I'm here to support you." }
    ],
    "Chat 3": [
        { sender: "bot", text: "You're now in Chat 3. Feel free to share your thoughts." }
    ],
    "Chat 4": [
        { sender: "bot", text: "Welcome to Chat 4! Let’s talk." }
    ],
    "Chat 5": [
        { sender: "bot", text: "This is Chat 5. How can I assist you today?" }
    ]
};

let currentChat = "Chat 1";
let chatCounter = 6; // Counter for new chats

// Load a chat conversation when a chat name is clicked
function loadChat(chatName) {
    currentChat = chatName;
    document.getElementById("chatTitle").textContent = chatName;
    const chatMessagesDiv = document.getElementById("chatMessages");
    chatMessagesDiv.innerHTML = ""; // Clear previous messages

    const messages = chatConversations[chatName] || [];
    messages.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", message.sender);
        messageDiv.textContent = message.text;
        chatMessagesDiv.appendChild(messageDiv);
    });

    // Scroll to bottom
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

// Send message function
function sendMessage() {
    const input = document.getElementById("userInput");
    const messageText = input.value.trim();
    if (messageText === "") return;

    const chatMessagesDiv = document.getElementById("chatMessages");

    // Append user message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("chat-message", "user");
    userMessageDiv.textContent = messageText;
    chatMessagesDiv.appendChild(userMessageDiv);
    input.value = "";

    // Scroll to bottom
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

    // Save user message
    if (!chatConversations[currentChat]) {
        chatConversations[currentChat] = [];
    }
    chatConversations[currentChat].push({ sender: "user", text: messageText });

    // Simulate bot response after a delay
    setTimeout(() => {
        const botResponse = getBotResponse(messageText);
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("chat-message", "bot");
        botMessageDiv.textContent = botResponse;
        chatMessagesDiv.appendChild(botMessageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

        // Save bot message
        chatConversations[currentChat].push({ sender: "bot", text: botResponse });
    }, 1000);
}

// Basic bot response logic
function getBotResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    if (lower.includes("hello")) {
        return "Hi there! How can I help you?";
    } else if (lower.includes("grief")) {
        return "Grief can be tough, but I'm here to support you.";
    } else if (lower.includes("help")) {
        return "I'm here for you. Tell me what's on your mind.";
    } else {
        return "I see. Could you tell me more?";
    }
}

// Function to create a new chat
function createNewChat() {
    const newChatName = "Chat " + chatCounter;
    chatCounter++;

    // Initialize conversation for the new chat with a welcome message
    chatConversations[newChatName] = [
        { sender: "bot", text: "Welcome to " + newChatName + "! How can I help you today?" }
    ];

    // Add new chat to the chat list UI
    const chatListUl = document.getElementById("chatList");
    const newChatLi = document.createElement("li");
    newChatLi.textContent = newChatName;
    newChatLi.setAttribute("onclick", "loadChat('" + newChatName + "')");
    chatListUl.appendChild(newChatLi);

    // Load the new chat
    loadChat(newChatName);
}

// On page load, load the default chat
document.addEventListener("DOMContentLoaded", function() {
    loadChat(currentChat);
});
