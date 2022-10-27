import config from '../config.js';
import searchCommands from './util/searchCommands.js';
import filterCommands from './util/filterCommands.js';
import {
  putApplicationCommands,
  putApplicationGuildsCommands,
  deleteApplicationCommands,
  deleteApplicationGuildsCommands,
} from "./util/execute.js"

const applicationId = config.DISCORD_CLIENT_ID
const guildsIds = config.DISCORD_GUILD_ID

const filterPremium = ['countdown']
const filterPublic = []
const filterDev = ['log'];

export async function deployCommands(){
  let result = {}
  const commands = await searchCommands()
  const commandsPremium = filterCommands(filterPremium, commands);
  const commandsGlobal =  filterCommands(filterPublic, commands);
  const commandsDeveloper =  filterCommands(filterDev, commands);

  //public commands
  result.servPublic = await putApplicationCommands( applicationId, commandsGlobal )
  if ( !result.servPublic.done ) {
    result.servPublicdeleted = await deleteApplicationCommands( applicationId )
  }
  result.servDev = await putApplicationGuildsCommands( applicationId, guildsIds, commandsDeveloper)
  //result.deleteservDev= await deleteApplicationGuildsCommands( applicationId, guildsIds)
  
  return result
}
