require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

// Crear el cliente del bot con intents necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Cargar comandos dinámicamente desde la carpeta commands/
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command && command.name) client.commands.set(command.name, command);
  }
}

// Cuando el bot se conecta
client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Un único listener para manejar comandos y mensajes simples
const PREFIX = '!';
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Comando simple ping
  if (message.content === `${PREFIX}ping`) return message.reply('🏓 Pong!');

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error('Error al ejecutar comando:', error);
    message.reply('Ocurrió un error al ejecutar ese comando.');
  }
});

// Endpoint para Uptime / healthcheck
const app = express();
app.get('/', (req, res) => res.send('Bot activo! 🔥'));
app.listen(3000, () => console.log('Servidor web activo en el puerto 3000'));

// Iniciar sesión del bot
if (!process.env.DISCORD_TOKEN) {
  console.warn('No se encontró DISCORD_TOKEN en el entorno. Añádelo a .env antes de iniciar.');
} else {
  client.login(process.env.DISCORD_TOKEN).catch(err => console.error('Error al iniciar sesión:', err));
}