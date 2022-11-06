import * as fs from 'fs'

const messagesCreateFile = fs.readdirSync('./src/messageCreate').filter((file) => file.endsWith('.js'))
/**
 * @param {import('discord.js').Message} message
 */
async function messagesCreateExecute(message) {
  for (const messageCreateDir of messagesCreateFile) {
    ;(await import(`./messageCreate/${messageCreateDir}`)).default(message)
  }
}
export default function (message) {
  messagesCreateExecute(message)
}
