import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from '../config.js';
import searchCommands from './util/searchCommands.js';

const commands = searchCommands()
const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);

(async () => {
	if (config.DISCORD_GUILD_GLOBAL){
		try {
			config.DISCORD_GUILD_ID.map(guildId => deleteGuildCommands(guildId))
			console.log('refreshing (/) commands in Global.');
			const url_applicationCommands = Routes.applicationCommands(
				config.DISCORD_CLIENT_ID
			);
			await rest.put(	url_applicationCommands, { body: commands });
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
  console.log("(/) deleting all commands");
  const url_applicationCommands = Routes.applicationCommands(
    config.DISCORD_CLIENT_ID
  );
  const query = await rest.get(url_applicationCommands);

  query.map((command) => {
    const url_applicationCommand = Routes.applicationCommand(
      config.DISCORD_CLIENT_ID,
      command.id
    );
    rest.delete(url_applicationCommand);
  });
}
async function deleteGuildCommands(guildId) {
  console.log("(/) deleting all guild commands");
  const url_applicationGuildCommands = Routes.applicationGuildCommands(
    config.DISCORD_CLIENT_ID,
    guildId
  );
  const query = await rest.get(url_applicationGuildCommands);

  await query.map((command) => {
    const url_applicationGuildCommand = Routes.applicationGuildCommand(
      config.DISCORD_CLIENT_ID,
      guildId,
      command.id
    );
    rest.delete(url_applicationGuildCommand);
  });
  console.log("(/) deleting ... OK");
}