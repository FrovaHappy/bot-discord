import { EmbedBuilder, Colors } from 'discord.js'

const roleIdUpdated = (query) => {
  return new EmbedBuilder()
    .setTitle('role actualizado')
    .setDescription(`Se notificara con el role <@&${query.roleId}>`)
    .setColor(Colors.Green)
}
const roleIdDontUdated = new EmbedBuilder()
  .setTitle('Tuve problemas')
  .setDescription('parece que no pudedo conectarme a mi bases de datos ;-;')
  .setColor(Colors.Red)
export { roleIdUpdated, roleIdDontUdated }
