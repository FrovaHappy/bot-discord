import { randomUUID } from 'crypto'
import { send_OverflowValue, send_timeInit, send_timeFinish } from './messages/timeOn.js'
import { BuilderTime } from './utils/builderTime.js'
import { timeIds } from '../../../config.js'
import { dataControler } from './utils/dataControler.js'

export async function timeOn(interaction, options) {
  let data = await dataControler(interaction, options)
  console.log(data)
  const time = new BuilderTime(data.time.hours, data.time.mins)
  console.log(options)
  if (time.isInvalidTime()) {
    send_OverflowValue(interaction, time)
    return
  }
  const messageId = randomUUID()
  const timeOut = startSetTimeout(interaction, time, messageId, data)
  timeIds.set(messageId, timeOut)
  send_timeInit(interaction, time, messageId)
}
function startSetTimeout(interaction, time, messageId, data) {
  let rest = setTimeout(() => {
    timeIds.delete(messageId)
    send_timeFinish(interaction, data, messageId)
  }, time.totalTime)
  return rest
}
