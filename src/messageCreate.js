/**
 * @param {import('discord.js').Message} message
 */
export default function (message) {
  console.log(message, '\n================================')
  if (!(message.author.id == '653429940502659111')) return
  message.reply('de una')
}
