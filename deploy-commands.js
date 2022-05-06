import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config.js';

let commands = [];


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const fileContent = await import(`./commands/${file}`);
	const command = fileContent.default;
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);

(async () => {
	for (const guild of config.DISCORD_GUILD_ID) {
		console.log('Registering Guild :',guild);
		try {
			console.log('···Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guild),
				{ body: commands },
			);

			console.log('···Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	}
})();