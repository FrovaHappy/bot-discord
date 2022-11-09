import { createcountdown } from './services/autoBupping/countdown.js'
import { thankEmbed } from './services/autoBupping/messages.js'
/**
 * @param {import('discord.js').Message} message
 */
function defaultSearch(message) {
  const data = [
    {
      authorId: '964321676651266138',
      commandName: 'e-log',
      relativeTimestamp: 5,
    },
    {
      authorId: '302050872383242240',
      commandName: 'bump',
      relativeTimestamp: 7200,
    },
  ]
  let dataFind

  data.forEach((value) => {
    if (value.authorId == message.author.id && value.commandName == message?.interaction?.commandName) {
      dataFind = value
    }
  })
  return dataFind
}

/**
 * @param {import('discord.js').Message} message
 */
export default async function (message) {
  const defaultdata = defaultSearch(message)
  console.log(defaultdata)
  if (!defaultdata) return

  message.reply({ embeds: [thankEmbed(defaultdata, message)] })
  await createcountdown(defaultdata, message)
}
