import { updateAutobupping } from '../../../database/db.messageCreate/autobupping.db.js'
import { roleIdDontUdated, roleIdUpdated } from './messages.js'
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {string} roleId
 */
const updateRole = (interaction, roleId) => {
  const find = { guildId: interaction.guildId }
  const update = { guildId: interaction.guildId, roleId: roleId }
  console.log(update)
  updateAutobupping(find, update)
    .then((query) => {
      console.log(query)
      interaction.reply({ embeds: [roleIdUpdated(query)] })
    })
    .catch((err) => {
      interaction.reply({ embeds: [roleIdDontUdated] })
      console.error(err.message)
    })
}
export { updateRole }
