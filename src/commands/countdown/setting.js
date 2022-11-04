import { CountdownQuery } from '../../database/countdown.js'
import { send_withoutParameters, send_dataSaved } from './messages/setting.js'
import { BuilderTime } from './utils/builderTime.js'

export async function setCountdownData(interaction, options) {
  const permissions = interaction.memberPermissions.has(['ADMINISTRATOR'])
  const time = new BuilderTime(options.setHours, options.setMins)
  console.log(time)
  if (!permissions) {
    interaction.reply('Careses de permisos de administrator. ')
    return
  }
  if (time.isInvalidTime()) {
    let newi = await interaction.reply(`el timepo supera el limite de ${time.convertHours(time.limitTime)}`)
    console.log(newi)
    return
  }
  let countdownQuery = new CountdownQuery(interaction)
  await countdownQuery.setData(options)
  if (countdownQuery.valuesUpdated === 0) {
    send_withoutParameters(interaction, countdownQuery)
    return
  }
  send_dataSaved(interaction, countdownQuery)
}
