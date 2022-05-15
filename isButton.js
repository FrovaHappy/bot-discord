export function isButton(interaction){
    if (!interaction.isButton()) return;
	
	console.log(interaction);
	interaction.update({ content: 'A button was clicked!', components: [] })
}
