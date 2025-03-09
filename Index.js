const mineflayer = require('mineflayer');

const botOptions = {
    host: "SoloRealmSMP.aternos.me",  // Replace with your Minecraft server IP
    port: 11912,             // Change if your server uses a different port
    username: "Bismillah",     // Use an alt or cracked account
    version: "1.19.2"        // Match your server version
};

function createBot() {
    const bot = mineflayer.createBot(botOptions);

    bot.on('login', () => {
        console.log("Bot has joined the server!");
    });

    bot.on('spawn', () => {
        console.log("Bot spawned successfully.");
        startAfkLoop(bot);
        startChatLoop(bot);
    });

    bot.on('kicked', (reason) => {
        console.log(`Kicked! Reason: ${reason}`);
        console.log("Reconnecting in 5 seconds...");
        setTimeout(createBot, 5000);
    });

    bot.on('end', () => {
        console.log("Disconnected! Reconnecting...");
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log(`Error: ${err}`);
    });

    bot.on('message', (msg) => {
        const message = msg.toString().toLowerCase();
        if (message.includes("afk") || message.includes("kick") || message.includes("idle")) {
            console.log("Possible AFK kick warning detected! Moving to prevent it.");
            preventKick(bot);
        }
    });
}

// Function to prevent AFK kicks with random movements
function startAfkLoop(bot) {
    setInterval(() => {
        const actions = ['forward', 'back', 'left', 'right', 'jump', 'sneak'];
        const action = actions[Math.floor(Math.random() * actions.length)];

        bot.setControlState(action, true);
        setTimeout(() => bot.setControlState(action, false), Math.random() * 2000 + 500);

        console.log(`AFK movement: ${action}`);
    }, 30000); // Every 30 seconds
}

// Function to send random chat messages
function startChatLoop(bot) {
    const messages = [
        "Hey, what's up?",
        "Anyone online?",
        "I love this server!",
        "AFK for a bit, brb!",
        "This place is amazing!"
    ];

    setInterval(() => {
        const message = messages[Math.floor(Math.random() * messages.length)];
        bot.chat(message);
        console.log(`Sent chat message: ${message}`);
    }, Math.random() * 600000 + 300000); // Every 5-10 minutes
}

// Function to react to AFK warnings
function preventKick(bot) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 1000);
    bot.chat("I'm still here!");
}

// Start the bot
createBot();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('AFK bot is running!');
});

// Force Replit to use a public URL
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web server running on port ${PORT} for UptimeRobot.`);
});
