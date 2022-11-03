import * as fs from 'fs'
import { Collection } from 'discord.js'

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

export async function getData(){
  let commandsData = []
  for (const file of commandFiles) {
    const fileContent = (await import(`../../src/commands/${file}`)).default
    commandsData.push(fileContent.data.toJSON())
  }
  return commandsData
}
export async function getCollection(){
  let collection = new Collection()
  for (const file of commandFiles) {
    const fileContent = (await import(`../../src/commands/${file}`)).default
    collection.set(fileContent.data.name, fileContent)
  }
  return collection
}
export default {
  getCollection,
  getData
}
