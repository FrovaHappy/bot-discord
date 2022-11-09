import { findAutobupping } from '../../../database/db.messageCreate/autobupping.db.js'
import { toBuppedEmbed } from './messages.js'
/**
 *
 * @param {*} data
 * @param {import('discord.js').Message} message
 * @returns
 */
const createcountdown = async (data, message) => {
  const query = await findAutobupping({ guildId: message.guildId ?? '' })
  setTimeout(() => {
    if (!query) return message.channel.send({ embeds: [toBuppedEmbed(data)] })
    message.channel.send({ content: `<@&${query.roleId}>`, embeds: [toBuppedEmbed(data)] })
  }, data.relativeTimestamp * 1000)
}

export { createcountdown }
