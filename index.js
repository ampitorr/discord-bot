console.log("TOKEN:", process.env.DISCORD_TOKEN);
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Crear el cliente del bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Cuando el bot se conecta
client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Responder a mensajes
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('🏓 Pong!');
  }
});
const express = require('express');
const app = express();

// Endpoint para que UptimeRobot mantenga el bot activo
app.get('/', (req, res) => {
  res.send('Bot activo! 🔥');
});

app.listen(3000, () => console.log('Servidor web activo en Replit'));