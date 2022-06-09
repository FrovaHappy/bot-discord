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
			config.DISCORD_GUILD_ID.map(guildId => deleteGuildCommands(guildId))
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
	await deleteCommands()
	config.DISCORD_GUILD_ID.map(guild => {
		try {
			console.log(`(/) refreshing  commands in ${guild}.`);
			rest.put(
				Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guild),
				{ body: commands },
			);
			console.log('(/) refreshing ··· OK');
		} catch (error) {
			console.error(error);
		}
	})
})();
async function deleteCommands() {
  const query = await rest.get(
    Routes.applicationCommands(config.DISCORD_CLIENT_ID)
  );
  console.log("(/) deleting all commands");
  query.map((command) =>
    rest.delete(Routes.applicationCommand(config.DISCORD_CLIENT_ID, command.id))
  );
}
async function deleteGuildCommands(guildId) {
  const query = await rest.get(
    Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId)
  );
  console.log("(/) deleting all guild commands");
  query.map((command) =>
    rest.delete(
      Routes.applicationGuildCommand(
        config.DISCORD_CLIENT_ID,
        guildId,
        command.id
      )
    )
  );
  console.log("(/) deleting ... OK");
}