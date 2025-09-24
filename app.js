// Application data
const appData = {
  currentUsage: 47.3,
  dailyLimit: 60,
  weeklyUsage: [38, 42, 55, 41, 47, 52, 45],
  weeklyComparison: 15.2, // percent more or less than last week
  monthlyUsage: [1250, 1180, 1320, 1290, 1150, 1280, 1195],
  petHealth: "happy",
  petName: "Bubbles",
  petColor: "#4FC3F7",
  tankLevel: 78, // Percentage of tank fill to represent water usage
  roomUsage: [
    { room: "Bathroom", usage: 42, icon: "🚿", percentage: 45, trend: "up" },
    { room: "Kitchen", usage: 28, icon: "🍽️", percentage: 30, trend: "stable" },
    { room: "Laundry", usage: 18, icon: "👕", percentage: 19, trend: "down" },
    { room: "Garden", usage: 6, icon: "🌱", percentage: 6, trend: "stable" },
  ],
  alerts: [
    {
      type: "comparison",
      message: "You used 15% more water than last week — check for leaks or habits!",
      severity: "warning",
      icon: "📈",
      suggestion: "Check your faucets or shower habits.",
    },
    {
      type: "achievement",
      message: "Great job! You saved 8L yesterday.",
      severity: "success",
      icon: "🎉",
      suggestion: "Keep up the good work!",
    },
  ],
  goals: [
    { name: "Daily Target", current: 47.3, target: 50, percentage: 95, status: "on-track" },
    { name: "Weekly Goal", current: 315, target: 350, percentage: 90, status: "excellent" },
  ],
  achievements: [
    { name: "Water Saver", icon: "💧", unlocked: true, description: "Saved 10L in a day", date: "2025-09-20" },
    { name: "Pet Protector", icon: "🐠", unlocked: true, description: "Kept your fish happy for 7 days", date: "2025-09-18" },
    { name: "Eco Warrior", icon: "🌱", unlocked: false, description: "Save 100L in a month", progress: 73 },
  ],
  familyMembers: [
    { name: "Mom", score: 265, streak: 8, avatar: "👩" },
    { name: "Dad", score: 218, streak: 5, avatar: "👨" },
    { name: "Emma", score: 189, streak: 6, avatar: "👧" },
    { name: "Alex", score: 167, streak: 3, avatar: "👦" },
  ],
  tips: [
    "Taking shorter showers can save up to 25 liters per day!",
    "Turn off the tap while brushing teeth - it saves 8L per minute.",
    "Fix leaky faucets immediately - they can waste 15L per day.",
    "Use a full load when running the washing machine to maximize efficiency.",
  ],
  challenges: [
    { title: "Shower Sprint", description: "Take showers under 5 minutes for a week", progress: 75, reward: "🏆", daysLeft: 3 },
    { title: "Leak Detective", description: "Check all faucets for leaks", progress: 100, reward: "🕵️", completed: true },
    { title: "Family Goal", description: "Use less than 200L as a family today", progress: 85, reward: "👨‍👩‍👧‍👦", timeLeft: "6 hours" },
  ],
  fishPersonality: {
    traits: ["Playful", "Eco-friendly", "Motivating"],
    mood: "excited",
    level: 12,
    experience: 850,
  },
  chatHistory: [
    { sender: "ai", message: "Hi! I noticed your bathroom usage is up 20% this week. Would you like some tips to reduce it?", timestamp: "10:30 AM" },
    { sender: "user", message: "Yes, please help!", timestamp: "10:32 AM" },
    { sender: "ai", message: "Try taking 2-minute shorter showers! Also, check if your toilet has any leaks by adding food coloring to the tank.", timestamp: "10:32 AM" },
  ],
};

// DOM Elements
const fish = document.getElementById("fish");
const tankWater = document.getElementById("tankWater");
const roomUsageList = document.getElementById("roomUsageList");
const alertList = document.getElementById("alertList");
const goalList = document.getElementById("goalList");
const achievementList = document.getElementById("achievementList");
const familyList = document.getElementById("familyList");
const tipsList = document.getElementById("tipsList");
const challengeList = document.getElementById("challengeList");

const fishNameInput = document.getElementById("fishNameInput");
const fishColorPicker = document.getElementById("fishColorPicker");
const setFishBtn = document.getElementById("setFishBtn");

// Helper Functions
function renderFish() {
  fish.textContent = "🐟";
  fish.style.backgroundColor = appData.petColor;
  fish.setAttribute("title", appData.petName || "Your virtual pet fish");
}

function updateWaterLevel() {
  let level = Math.min(100, (appData.currentUsage / appData.dailyLimit) * 100);
  tankWater.style.height = level + "%";
}

function displayRoomUsage() {
  roomUsageList.innerHTML = "";
  appData.roomUsage.forEach((room) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${room.icon} ${room.room}</span>
      <span>${room.usage} L (${room.percentage}%)</span>
      <div class="usage-bar" style="width: ${room.percentage}%;"></div>`;
    roomUsageList.appendChild(li);
  });
}

function displayAlerts() {
  alertList.innerHTML = "";
  appData.alerts.forEach((alert) => {
    const p = document.createElement("p");
    p.textContent = `${alert.icon} ${alert.message}`;
    alertList.appendChild(p);
  });
}

function displayGoals() {
  goalList.innerHTML = "";
  appData.goals.forEach((goal) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${goal.name}:</span>
    <span>${goal.current} / ${goal.target} (${goal.percentage}%)</span>`;
    goalList.appendChild(li);
  });
}

function displayAchievements() {
  achievementList.innerHTML = "";
  appData.achievements.forEach((ach) => {
    const li = document.createElement("li");
    li.textContent = `${ach.icon} ${ach.name}`;
    if (!ach.unlocked) {
      li.style.opacity = "0.5";
    }
    achievementList.appendChild(li);
  });
}

function displayFamily() {
  familyList.innerHTML = "";
  appData.familyMembers.forEach((member) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="avatar">${member.avatar}</span> ${member.name} - Score: ${member.score} (Streak: ${member.streak})`;
    familyList.appendChild(li);
  });
}

function displayTips() {
  tipsList.innerHTML = "";
  appData.tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

function displayChallenges() {
  challengeList.innerHTML = "";
  appData.challenges.forEach((challenge) => {
    const li = document.createElement("li");
    li.textContent = `${challenge.title}: ${challenge.description} - Progress: ${challenge.progress}%`;
    if (challenge.completed) li.classList.add("completed");
    challengeList.appendChild(li);
  });
}

// Fish customization handlers
setFishBtn.addEventListener("click", () => {
  const newName = fishNameInput.value.trim();
  if (newName) {
    appData.petName = newName;
    fishNameInput.value = "";
  }
  appData.petColor = fishColorPicker.value;
  refreshUI();
});

function refreshUI() {
  // Update fish display
  renderFish();
  updateWaterLevel();
  displayRoomUsage();
  displayAlerts();
  displayGoals();
  displayAchievements();
  displayFamily();
  displayTips();
  displayChallenges();
}

// AI Chatbot (simple simulation)
const chatbotToggle = document.getElementById("chatbotToggle");
const chatWindow = document.getElementById("chatWindow");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

chatbotToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
  if (!chatWindow.classList.contains("hidden")) {
    chatMessages.focus();
  }
});

function appendChatMessage(sender, message) {
  const msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = message;
  chatMessages.appendChild(msg);
  chatMessages.scrollTo(0, chatMessages.scrollHeight);
}

function simulateAIResponse(message) {
  // Basic keyword AI replies
  const lower = message.toLowerCase();
  if (lower.includes("shower")) {
    return "Shorter showers can save a lot of water! Aim for under 5 minutes.";
  } else if (lower.includes("leak")) {
    return "Check your faucets and toilets for leaks using food coloring tests.";
  } else if (lower.includes("tips")) {
    return "Try turning off taps while brushing teeth and fixing dripping faucets.";
  }
  return "Great question! Keep monitoring your water usage and ask anytime.";
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;
  appendChatMessage("user", userMsg);
  chatInput.value = "";

  setTimeout(() => {
    const aiMsg = simulateAIResponse(userMsg);
    appendChatMessage("ai", aiMsg);
  }, 900);
});

// Initialize
window.onload = () => {
  refreshUI();
  // Initialize fish with name and color
  renderFish();
};
