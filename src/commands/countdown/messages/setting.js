import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { buildersDbChange } from "../utils/builderDbchange.js";

export function send_withoutParameters(interaction, countdownQuery) {
  let description = `
    Mis valores globales son:
    ${buildersDbChange(countdownQuery)}
  `;
  const embed = new EmbedBuilder()
    .setTitle("Nada para hacer:")
    .setColor("#4990ff")
    .setDescription(description);
  interaction.reply({ embeds: [embed] });
}
export function send_dataSaved(interaction, countdownQuery) {
  let description = `
    Mis valores globales son:
    ${buildersDbChange(countdownQuery)}
  `;
  const embed = new EmbedBuilder()
    .setTitle("Datos guardados:")
    .setColor("#4990ff")
    .setDescription(description);
  interaction.reply({ embeds: [embed] });
}
