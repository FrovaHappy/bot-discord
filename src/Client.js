import config from '../config.js'
import { Client, GatewayIntentBits } from 'discord.js'
import interactionCreate from './interactionCreate.js'
import commandsList from '../api/util/commandsList.js'
import messageCreate from './messageCreate.js'
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})
;(async () => {
  client.commands = await commandsList.getCollection()

  client.once('ready', () => {
    console.log('Ready client!')
  })

  client.on('interactionCreate', async (interaction) => {
    interactionCreate(interaction, client)
  })
  client.on('messageCreate', async (message) => {
    messageCreate(message)
  })

  client.login(config.DISCORD_TOKEN)
})()
