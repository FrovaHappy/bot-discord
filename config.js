// var env
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN || ''
const clientId = process.env.DISCORD_CLIENT_ID || ''
const urlAPI = process.env.URL_API || 'localhost:3000/'
const guildId = ['951875023868686336']
const port = process.env.PORT || 5000
export let timeIds = new Map()

let getDbHost = process.env.MONGODB_HOST ?? 'mongodb://localhost:27017/bot_discord_broken'

const configurations = {
    DISCORD_CLIENT_ID: clientId,
    DISCORD_GUILD_ID: guildId,
    DISCORD_TOKEN: token,
    MONGODB_HOST: getDbHost,
    PORT: port,
    URL_API: urlAPI
};

export default configurations