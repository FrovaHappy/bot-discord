import config from '../config.js'
import searchCommands from './util/searchCommands.js'
import filterCommands from './util/filterCommands.js'
import {
  putApplicationCommands,
  putApplicationGuildsCommands,
  deleteApplicationCommands,
} from './util/execute.js'

const applicationId = config.DISCORD_CLIENT_ID
const guildsIds = config.DISCORD_GUILD_ID

const servers = {
  premium: [],
  global: ['countdown'],
}

export async function deployCommands() {
  let result = {}
  const commands = await searchCommands()
  const commandsFiltert = filterCommands(servers, commands)
  const commandsPremium = commandsFiltert.premium
  const commandsGlobal = commandsFiltert.global
  const commandsDeveloper = commandsFiltert.developer

  //public commands
  result.servPublic = await putApplicationCommands(applicationId, commandsGlobal)
  if (!result.servPublic.done) {
    result.servPublicdeleted = await deleteApplicationCommands(applicationId)
  }
  result.servDev = await putApplicationGuildsCommands(applicationId, guildsIds, commandsDeveloper)

  return result
}
