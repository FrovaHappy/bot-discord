//@ts-check

/**
* @param {string[]} commandsNameFilter 
* @param {array} commands
*/
function filterCommands(commandsNameFilter, commands) {
  let result = commandsNameFilter.map((name) => {
    return commands.filter((command) => command.name === name)[0];
  });
  return result.filter((isDefined) => isDefined);
}

export default filterCommands;
