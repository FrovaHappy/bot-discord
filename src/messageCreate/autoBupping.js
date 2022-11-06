const data = {
  authorId: '653429940502659111',
  content: 'hola',
}

/**
 * @param {import('discord.js').Message} message
 */
export default async function (message) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(new Date())
    }, 10000)
  })

  if (!(message.author.id == data.authorId && message.content == data.content)) return
  console.log(new Date())
  const time = await promise
  console.log(time)
  message.reply('como estas')
}
