import { CountdownQuery } from "../../../database/countdown.js";
import { GetTime } from "./getters.dataControler/get.time.js";
import { GetDescription } from "./getters.dataControler/get.description.js"
import { GetRole } from "./getters.dataControler/get.role.js"
export async function dataControler(interaction, options){
  let dataGuild = new CountdownQuery(interaction);
  await dataGuild.getData()
  
  return buildercontroller(interaction, options, dataGuild);
}


function buildercontroller(interaction, dataUser, dataGuild){
  let data = {};
  const getTime = new GetTime(dataUser, dataGuild.data);
  const getDescription = new GetDescription(dataUser, dataGuild.data)
  const getRole = new GetRole(dataUser, dataGuild.data)
  
  data.user = interaction.user;
  data.time = getTime.time;
  data.description = getDescription.description;
  data.role = getRole.role;

  return data;
}