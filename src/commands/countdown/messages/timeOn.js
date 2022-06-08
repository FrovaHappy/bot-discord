import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { CountdownQuery } from "../../../database/countdown.js";
import {BuilderMngFinish} from "../utils/builderMsgFinish.js";

async function globalProperties(interaction) {
  const countdownQuery = new CountdownQuery(interaction);
  return countdownQuery.getData();
}
export function send_OverflowValue(interaction, time) {
  const description = `
    El tiempo es mayor a las \` 6 hs.\` 
    Tiempo introducido: \` ${time.convertHours(time.hours)} hs ${time.convertMinutes(time.mins)} mins \`
  `;
  const embed = new MessageEmbed()
    .setTitle("Tiempo Invalido:")
    .setColor("#FFA233")
    .setDescription(description);
  interaction.reply({ embeds: [embed] });
}
export function send_timeInit(interaction, time, messageId) {
  const embed = new MessageEmbed()
    .setTitle("Tiempo en marcha:")
    .setColor("#00ff00")
    .setDescription(
      `el mensaje se enviara en \` ${time.timeDefaultOrHours()} hs ${time.convertMinutes(time.mins)} mins \``
    )
    .setFooter({ text: `TimerId: ${messageId}` });
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("timeDeleted")
      .setLabel("Stop.")
      .setStyle("DANGER")
  );
  interaction.reply({ embeds: [embed], components: [row] });
}
export async function send_timeFinish(interaction, options, messageId) {
  let queryProperties = await globalProperties(interaction);
  const buildMessage = new BuilderMngFinish(options, queryProperties)
  const embed = new MessageEmbed()
    .setTitle("Tiempo finalizado:")
    .setColor("#00ff00")
    .setDescription(buildMessage.description)
    .setFooter({ text: `TimerId: ${messageId}` });
  interaction.channel.send({content:buildMessage.content ,embeds: [embed] });
}
