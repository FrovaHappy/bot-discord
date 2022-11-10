import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { updateRole } from './services/setAutobupping/updateRole.js'

const slashCommand = new SlashCommandBuilder()
  .setName('set-autobupping')
  .setDescription('Cambia el mensaje del autobupping')
  .addMentionableOption((option) =>
    option.setName('role').setDescription('Configura el role que se usara para mencinar.').setRequired(true)
  )
  .setDMPermission(false)
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */
const execute = (interaction) => {
  const role = interaction.options.getMentionable('role')
  updateRole(interaction, role.id)
}

export default {
  data: slashCommand,
  execute,
}
