//@ts-check
/**
 * @param {{premium:string[],global:string[]}} commandsToFilter
 * @param {import('@discordjs/builders').SlashCommandBuilder[]} slashCommands
 * @return returns an object with slashCommands servers.
 */
function filterCommands(commandsToFilter, slashCommands) {
  const serversNames = Object.keys(commandsToFilter)
  let developer = slashCommands
  let servers = {}
  serversNames.map((serverName) => {
    servers[serverName] = commandsToFilter[serverName]
      .map((commandName) => {
        //search the slash commands declared in the commandtofilter
        const slashCommandsFound = slashCommands.filter((commnand) => {
          return commnand.name == commandName
        })
        //the slash commands found are removed from developer
        slashCommandsFound.map((slashCommandFound) => {
          developer = developer.filter((slashCommandInDev) => {
            return !(slashCommandInDev == slashCommandFound)
          })
        })
        return slashCommandsFound
      })
      .flat()
  })
  servers.developer = developer
  return servers
}
export default filterCommands
