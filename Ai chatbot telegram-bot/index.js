import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const bot = new Telegraf(
  process.env.BOT_TOKEN || "8136315237:AAE9aT3tKXmURlmAZBFUaKTQN_TC0znYokU"
);

bot.on("message", async (ctx) => {
  const message = ctx.message.message.text;
  console.log("Received message:", ctx.message.text);

  // Here you can add your AI processing logic
  await axios.post();

  ctx.reply("Hello! How can I assist you today?");
});

console.log("Bot started");
bot.launch();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
