;('use estrict')
//@ts-check
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import config from '../../config.js'
import { SlashCommandBuilder } from '@discordjs/builders'
const deletingCommands = new SlashCommandBuilder().setName('delete-commands').setDescription('Delete')

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)
/**
 * @param {string} fullroute route generaded by the Roues Types API
 * @returns An string with the result done successfully or where failed
 */
async function deleteCommand(fullroute) {
  let status
  await rest.put(fullroute, { body: [deletingCommands.toJSON()] }).catch((e) => {
    status = { done: false, message: 'Delete command: error in the put operation' }
  })
  const commandfodeleting = await rest.get(fullroute).catch((e) => {
    status = { done: false, message: 'Delete command: error in the get operation' }
  })
  await Promise.all(
    commandfodeleting.map((command) => {
      const fullrouteCommandId = fullroute + '/' + command.id
      rest.delete(fullrouteCommandId).catch((e) => {
        status = { done: false, message: 'Delete command: error in the delete operation' }
      })
    })
  )
  return status ?? { done: true, message: 'command deleted successfully' }
}
/**
 * Publica en los sevidores privados ej. (serv premium y dev)
 * @param {string[]} guildsIds
 * @param {import('@discordjs/builders').SlashCommandBuilder[]} commands
 * @returns un array de objetos que contiene el guild.id y el estado que a finalizado
 */
export async function putApplicationGuildsCommands(applicationId, guildsIds, commands) {
  let result = []
  let commandsNames = []
  commands.map((command) => commandsNames.push(command.name))
  guildsIds.map((guildId) => {
    const fullroute = Routes.applicationGuildCommands(applicationId, guildId)
    result.push(
      rest.put(fullroute, { body: commands }).then(
        (_resolve) => {
          return { guildId, done: true, commandsNames }
        },
        (_reject) => {
          return { guildId, done: false, commandsNames }
        }
      )
    )
  })
  return await Promise.all(result)
}
/**
 * request for public server
 * @param {string} applicationId
 * @param {array} commands
 * @returns {object} si se resolvio sastifacotiamente
 */
export async function putApplicationCommands(applicationId, commands) {
  let commandsNames = []
  commands.map((command) => commandsNames.push(command.name))
  if (commands.length === 0) return false
  const fullroute = Routes.applicationCommands(applicationId)
  const result = await rest.put(fullroute, { body: commands }).then(
    (_resolve) => {
      return { done: true, commandsNames }
    },
    (_reject) => {
      return { done: false, commandsNames }
    }
  )
  return result
}
/**
 * @param {string} applicationId
 * @param {string[]} guildsIds
 */
export async function deleteApplicationGuildsCommands(applicationId, guildsIds) {
  let result = []
  result = guildsIds.map((guildId) => {
    const fullroute = Routes.applicationGuildCommands(applicationId, guildId)
    return deleteCommand(fullroute)
  })
  result = await Promise.all(result)
  result.map((obj, index) => {
    obj.guildId = guildsIds[index]
    return obj
  })
  return result
}
export async function deleteApplicationCommands(applicationId) {
  const fullroute = Routes.applicationCommands(applicationId)
  return await deleteCommand(fullroute)
}
