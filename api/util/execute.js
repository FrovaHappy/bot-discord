;('use estrict')
//@ts-check
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import config from '../../config.js'
import { SlashCommandBuilder } from '@discordjs/builders'
const deletingCommands = new SlashCommandBuilder().setName('delete-commands').setDescription('Delete')

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN)

export async function deleteCommand(applicationId, guildsId) {
  await rest
    .put(Routes.applicationGuildCommands(applicationId, guildsId), { body: [deletingCommands.toJSON()] })
    .catch((e) => {
      console.log('en el put')
    })
  const commandfodeleting = await rest.get(Routes.applicationGuildCommands(applicationId, guildsId)).catch((e) => {
    console.log('en el get')
  })
  await Promise.all(
    commandfodeleting.map((command) => {
      rest.delete(Routes.applicationGuildCommand(applicationId, guildsId, command.id)).catch((e) => {
        console.log('en el delete')
      })
    })
  )
}
/**
 * Publica en los sevidores privados ej. (serv premium y dev)
 * @param {string[]} guildsIds
 * @param {Array} commands
 * @returns un array de objetos que contiene el guild.id y el estado que a finalizado
 */
export async function putApplicationGuildsCommands(applicationId, guildsIds, commands) {
  let result = []
  guildsIds.map((guildId) => {
    const fullroute = Routes.applicationGuildCommands(applicationId, guildId)
    result.push(
      rest.put(fullroute, { body: commands }).then(
        (_resolve) => {
          return { guildId, done: true, commands }
        },
        (_reject) => {
          return { guildId, done: false, commands }
        }
      )
    )
  })
  return await Promise.all(result)
}
/**
 * @param {string} applicationId
 * @param {array} commands
 * @returns {object} si se resolvio sastifacotiamente
 */
export async function putApplicationCommands(applicationId, commands) {
  let commandsName = []
  commands.map((command) => commandsName.push(command.name))
  if (commands.length === 0) return false
  const fullroute = Routes.applicationCommands(applicationId)
  const result = await rest.put(fullroute, { body: commands }).then(
    (_resolve) => {
      return { done: true, commandsName }
    },
    (_reject) => {
      return { done: false, commandsName }
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
    return deleteForCommandId(fullroute)
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
  return await deleteForCommandId(fullroute)
}
// ? refactorizar haciendo un put en un comando vacio y luego eliminarlo(para evitar tantos deletes)
export async function deleteForCommandId(fullroute) {
  let result = []
  let count = 0
  const query = await rest.get(fullroute)
  query.map((command) => {
    const fullrouteCommandId = fullroute + '/' + command.id
    result.push(
      rest.delete(fullrouteCommandId).then(
        (_resolve) => {
          count++
          return { name: command.name, ok: 1 }
        },
        (_reject) => {
          return { name: command.name, ok: 0 }
        }
      )
    )
  })
  result = await Promise.all(result)
  return { done: count, total: query.length, result }
}
