import { timeOff } from './buttons/countdown/timeDelete.js'
export function isButton(interaction) {
  if (!interaction.isButton()) return
  // countdown
  if (interaction.customId === 'timeDeleted') timeOff(interaction) //stop button
}
