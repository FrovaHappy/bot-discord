import { CountdownQuery } from "../../database/countdown.js";
import { send_withoutParameters, send_dataSaved } from "./messages/setting.js";

export async function setCountdownData(interaction, options) {
  let countdownQuery = new CountdownQuery(interaction);
  const update = buildersUpdate(options);
  const queryResult = await countdownQuery.setData(update);
  const elementsInUpdate = Object.values(update);

  if (elementsInUpdate.length == 0) {
    send_withoutParameters(interaction, queryResult);
    return;
  }
  if (queryResult) {
    send_dataSaved(interaction, queryResult, update);
  } else {
    interaction.reply({ content: "error en database" });
  }
}

function buildersUpdate(options) {
  let result = {};

  if (options.setDescription) result.description = options.setDescription;
  if (options.setRole) result.role = options.setRole.id;

  return result;
}
