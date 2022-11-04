export async function isCommand(interaction, client) {
  if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  if (!command) return
  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: '**Command error** *Daño critico recibido.  No fui hecho para esto ;-;',
      ephemeral: true,
    })
  }
}
