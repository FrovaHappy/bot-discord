import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js'
const buttonStop = new ButtonBuilder().setCustomId('timeDeleted').setLabel('Stop.').setStyle('Danger').setDisabled(true)
const row = new ActionRowBuilder().addComponents(buttonStop)

export function send_timeDeleted(interaction, clientMessageId) {
  const descripcion = `
        el timerId \` ${clientMessageId} \` se elimino correctamente.
    `
  const embed = new EmbedBuilder()
    .setTitle('Un countdown menos en mis filas:')
    .setColor('#FFA233')
    .setDescription(descripcion)
  interaction.update({ embeds: [embed], components: [row] })
}
export function send_errClientMessageId(interaction, clientMessageId) {
  let iOld = interaction

  const embed = new EmbedBuilder()
    .setTitle('Eh fallado:')
    .setColor('#FFA233')
    .setDescription(`el timerId \` ${clientMessageId} \` ya expiro o no se encuentra.`)
  interaction.reply({ ephemeral: true, embeds: [embed] })
  iOld.message.edit({ components: [row] })
}
