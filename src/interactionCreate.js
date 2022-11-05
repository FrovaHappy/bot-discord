import { timeOff } from './buttons/countdown/timeDelete.js'
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {import('discord.js').Client} client
 */
async function isCommand(interaction, client) {
  const command = client.commands.get(interaction.commandName)
  if (!interaction.isCommand()) return
  if (!command) return
  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: '**Command error** *Daño critico recibido.  No fui hecho para esto ;-;',
      ephemeral: true,
    })
  }
}
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */
async function isButton(interaction) {
  if (!interaction.isButton()) return
  // countdown
  if (interaction.customId === 'timeDeleted') timeOff(interaction) //stop button
}
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {import('discord.js').Client} client
 */
export default function (interaction, client) {
  isButton(interaction)
  isCommand(interaction, client)
}
