import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Beep!'),
	async execute(interaction) {
		return interaction.reply('Boop!');
	},
};
