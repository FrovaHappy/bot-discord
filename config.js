// var env
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = ['951875023868686336'];
export let timeIds = new Map();
const guildGlobal = process.env.GUILD_GLOBAL || false;

let getDbHost = process.env.MONGODB_HOST || "mongodb://localhost:27017/<database>";
getDbHost = getDbHost
    .replace('<database>', process.env.MONGODB_NAME)
    .replace('<password>', process.env.MONGODB_PASSWORD);

const configurations = {
    DISCORD_CLIENT_ID: clientId,
    DISCORD_GUILD_ID: guildId,
    DISCORD_GUILD_GLOBAL: guildGlobal,
    DISCORD_TOKEN: token,
    MONGODB_HOST: getDbHost
};

export default configurations