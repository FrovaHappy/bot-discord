import { SlashCommandBuilder } from '@discordjs/builders'
import { timeOn } from './countdown/timeOn.js'
import { setCountdownData } from './countdown/setting.js'

const countdown = {
  data: new SlashCommandBuilder()
    .setName('countdown')
    .setDescription('esta mas alpedo, pero no me deja quitarlo xd')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('start')
        .setDescription('Inicia el countdown (por defecto 2hs y editado un max. de 8hs ).')
        .addIntegerOption((option) =>
          option.setName('hours').setDescription('Agrega cuantas horas quieres que espere. (solo num. enteros)')
        )
        .addIntegerOption((option) =>
          option.setName('mins').setDescription('Agrega cuantos minutos quieres que espere. (solo num. enteros)')
        )
        .addStringOption((option) =>
          option.setName('description').setDescription('personaliza el mensaje de respuesta.')
        )
        .addBooleanOption((option) => option.setName('mention').setDescription('te mensiono al finalizar?'))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setting')
        .setDescription('configura las variables globales del comando.')
        .addStringOption((option) =>
          option.setName('set_description').setDescription('Que quieres que le diga a todos?')
        )
        .addRoleOption((option) =>
          option.setName('set_role').setDescription('Lo usare para mensionar a todo aquel con dicho rol.')
        )
        .addChannelOption((option) => option.setName('set_channel').setDescription('En que lugar voy a funcionar.'))
        .addIntegerOption((option) => option.setName('set_hours').setDescription('Cambia los horas por defecto.'))
        .addIntegerOption((option) => option.setName('set_mins').setDescription('Cambia los minutos por defecto.'))
    ),
  async execute(interaction) {
    let options = {}
    if (interaction.options.getSubcommand() === 'start') {
      options.hours = interaction.options.getInteger('hours')
      options.mins = interaction.options.getInteger('mins')
      options.description = interaction.options.getString('description')
      options.mention = interaction.options.getBoolean('mention')
      options.role = interaction.user.id //deprecate

      timeOn(interaction, options)
      return
    }
    if (interaction.options.getSubcommand() === 'setting') {
      options.setDescription = interaction.options.getString('set_description')
      options.setRole = interaction.options.getRole('set_role')
      options.setChannel = interaction.options.getChannel('set_channel')
      options.setHours = interaction.options.getInteger('set_hours')
      options.setMins = interaction.options.getInteger('set_mins')

      setCountdownData(interaction, options)
      return
    }
  },
}
export default countdown
