import * as fs from 'fs'

export default async function searchCommands(){
  let commands = []

  const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const fileContent = await import(`../../src/commands/${file}`)
    const command = fileContent.default
    commands.push(command.data.toJSON())
  }
  return commands
}