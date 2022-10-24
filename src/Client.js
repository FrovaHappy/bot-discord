import * as fs from 'fs';
import config from '../config.js';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { isButton } from './isButton.js';
import { isCommand } from './isCommand.js';
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const fileContent = await import(`./commands/${file}`);
	const command = fileContent.default;
	client.commands.set(command.data.name, command);
}

(async () => {

	client.once('ready', () => {
		console.log('Ready client!');
	});

	client.on('interactionCreate', async interaction => {
		isButton(interaction);
		isCommand(interaction, client);
	});

	client.login(config.DISCORD_TOKEN);
})()