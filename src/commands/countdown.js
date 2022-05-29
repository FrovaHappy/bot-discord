import { SlashCommandBuilder } from '@discordjs/builders';
import { timeOn } from './countdown/timeOn.js';
import { setCountdownData } from './countdown/setting.js';

const countdown = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("esta mas alpedo, pero no me deja quitarlo xd")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("start")
        .setDescription("Inicia el countdown (por defecto 2hs y editado un max. de 8hs ).")
        .addIntegerOption((option) =>
          option
            .setName("hours")
            .setDescription("Agrega cuantas horas quieres que espere. (solo num. enteros)")
        )
        .addIntegerOption((option) =>
          option
            .setName("mins")
            .setDescription(
              "Agrega cuantos minutos quieres que espere. (solo num. enteros)"
            )
        )
        .addStringOption((option) =>
          option
            .setName('description')
            .setDescription('personaliza el mensaje de respuesta.')
        )
        .addBooleanOption((option)=>
          option
            .setName('mention')
            .setDescription('te mensiono al finalizar?')
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setting")
        .setDescription("configura las variables globales del comando.")
        .addStringOption((option) =>
          option
            .setName("set_description")
            .setDescription("Que quieres que le diga a todos?")
        )
        .addRoleOption((option)=>
          option
            .setName('set_role')
            .setDescription('Lo usare para mensionar a todo aquel con dicho rol.')
        )
    ),
  async execute(interaction) {

    if (interaction.options.getSubcommand() === "start") {
      let hours = interaction.options.getInteger("hours");
      let mins = interaction.options.getInteger("mins");

      timeOn(interaction, hours, mins);
      return;
    }
    if (interaction.options.getSubcommand() === "setting"){
      let options = {};
      options.setDescription= interaction.options.getString("set_description");
      options.setRole = interaction.options.getRole("set_role");
      
      setCountdownData(interaction, options)      
    }
  },
};
export default countdown;