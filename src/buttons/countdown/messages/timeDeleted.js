import { MessageEmbed, MessageActionRow, MessageButton} from 'discord.js';
const buttonStop= new MessageButton()
    .setCustomId('timeDeleted')
    .setLabel('Stop.')
    .setStyle('DANGER')
    .setDisabled(true)
;
const row = new MessageActionRow().addComponents(buttonStop);

export function send_timeDeleted (interaction, clientMessageId){
    const descripcion=`
        el timerId \` ${clientMessageId} \` se elimino correctamente.
    `;
    const embed = new MessageEmbed()
        .setTitle('Un countdown menos en mis filas:')
        .setColor('#FFA233')
        .setDescription(descripcion);
    interaction.update({ embeds: [embed], components: [row] });
}
export function send_errClientMessageId (interaction, clientMessageId){
    let iOld = interaction;

    const embed = new MessageEmbed()
        .setTitle('Eh fallado:')
        .setColor('#FFA233')
        .setDescription(`el timerId \` ${clientMessageId} \` ya expiro o no se encuentra.`)
    ;
    interaction.reply({ ephemeral: true, embeds: [embed] });
    iOld.message.edit({components: [row]});
}