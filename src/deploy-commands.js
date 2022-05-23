import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from '../config.js';

let commands = [];


const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const fileContent = await import(`./commands/${file}`);
	const command = fileContent.default;
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);

(async () => {
	if (config.DISCORD_GUILD_GLOBAL){
		try {
			console.log('refreshing (/) commands in Global.');

			await rest.put(
				Routes.applicationCommands(config.DISCORD_CLIENT_ID),
				{ body: commands },
			);

			console.log('(/) commands ··· Ok.');
		} catch (error) {
			console.error(error);
		}
		return
	}
	
	for (const guild of config.DISCORD_GUILD_ID) {
		try {
			console.log(`refreshing (/) commands in ${guild}.`);

			await rest.put(
				Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guild),
				{ body: commands },
			);

			console.log('(/) commands ··· Ok.');
		} catch (error) {
			console.error(error);
		}
	}
})();