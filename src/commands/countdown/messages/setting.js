import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export function send_withoutParameters(interaction, queryResult) {
  let description = `
    Mis valores globales son:
    > descripcion: \`${queryResult.description}\`
    > role: \`<@&${queryResult.role}>\`
  `;
  const embed = new MessageEmbed()
    .setTitle("Nada para hacer:")
    .setColor("#4990ff")
    .setDescription(description);
  interaction.reply({ embeds: [embed] });
}
export function send_dataSaved(interaction, queryResult, countdownQuery) {
  const descriptionChanged = ":black_large_square:";
  const roleChanged = ":black_large_square:";
  let description = `
    Mis valores globales son:
    > ${descriptionChanged} descripcion: \`${queryResult.description}\`
    > ${roleChanged} role: \`<@&${queryResult.role}>\`
  `;
  const embed = new MessageEmbed()
    .setTitle("Datos guardados:")
    .setColor("#4990ff")
    .setDescription(description);
  interaction.reply({ embeds: [embed] });
}
