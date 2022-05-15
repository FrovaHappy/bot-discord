import * as fs from 'fs';
import config from './config.js';
import { Client, Collection, Intents } from 'discord.js';
import { isButton } from './isButton.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const fileContent = await import(`./commands/${file}`);
	const command = fileContent.default;
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready client!');
});

client.on('interactionCreate', async interaction => {
	isButton(interaction);
	
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '**Command error** *Daño critico recibido.  No fui hecho para esto ;-;', ephemeral: true });
	}
});

import './deploy-commands.js';
client.login(config.DISCORD_TOKEN);