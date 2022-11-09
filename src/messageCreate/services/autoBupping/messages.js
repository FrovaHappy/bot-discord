import { EmbedBuilder } from 'discord.js'
/**
 *
 * @param {*} data
 * @param {import('discord.js').Message} message
 */
const thankEmbed = (data, message) => {
  const timestamps = Math.floor((message.editedTimestamp || message.createdTimestamp) / 1000) + data.relativeTimestamp
  return new EmbedBuilder()
    .setTitle('Gracias por Bumpear')
    .setDescription(`Te avisaremos <t:${timestamps}:R> <3`)
    .setColor(0xff0000)
}
const toBuppedEmbed = (data) => {
  return new EmbedBuilder()
    .setTitle('Es hora de Bumpear')
    .setDescription(`ejecuta \`\`/${data.commandName}\`\` :3`)
    .setColor(0xff0000)
}

export { thankEmbed, toBuppedEmbed }
