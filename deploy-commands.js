import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './config.js';

let commands = [];


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const fileContent = await import(`./commands/${file}`);
	const command = fileContent.default;
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	for (const guild of guildId) {
		console.log('Registering Guild :',guild);
		try {
			console.log('···Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(clientId, guild),
				{ body: commands },
			);

			console.log('···Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	}
})();