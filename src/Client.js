import * as fs from 'fs';
import config from '../config.js';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { isButton } from './isButton.js';
import { isCommand } from './isCommand.js';
import commandsList from '../api/util/commandsList.js'
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
] });
(async () => {
	client.commands = await commandsList.getCollection()
	client.once('ready', () => {
		console.log('Ready client!');
	});

	client.on('interactionCreate', async interaction => {
		isButton(interaction);
		isCommand(interaction, client);
	});

	client.login(config.DISCORD_TOKEN);
})()