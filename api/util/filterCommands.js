import searchCommands from "./searchCommands.js";

export async function filterCommands(filterCommandsName) {
  const commands = await searchCommands();
  let result = filterCommandsName.map((name) => {
    return commands.filter((command) => command.name === name)[0];
  });
  return result.filter((isDefined) => isDefined);
}
