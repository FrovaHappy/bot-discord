import { MessageEmbed, MessageActionRow, MessageButton} from 'discord.js';

export function send_OverflowValue(interaction, time){
    const message =`
        El tiempo es mayor a las \` 6 hs.\` 
        Tiempo introducido: \` ${time.hours} hs ${time.mins} mins \`
    `;
    const embed = new MessageEmbed()
        .setTitle('Tiempo Invalido:')
        .setColor('#FFA233')
        .setDescription(message)
    ;
    interaction.reply({ embeds: [embed] });
}

export function send_timeInit (interaction, time, messageId){
    const embed = new MessageEmbed()
        .setTitle('Tiempo en marcha:')
        .setColor('#00ff00')
        .setDescription(`el mensaje se enviara en \` ${time.hours} hs ${time.mins} mins \``)
        .setFooter({ text: (`TimerId: ${messageId}`)})
    ;
    const row = new MessageActionRow()
		.addComponents(
            new MessageButton()
                .setCustomId(`${messageId}`)
                .setLabel('Primary')
                .setStyle('DANGER'),
	);
    interaction.reply({ embeds: [embed], components: [row] });
}
export function send_timeFinish (interaction, messageId){
    const message =`
        ¡Después de una larga espera, llega el momento!
        \` ${interaction.user.username} \` ¿quieres casarte conmigo?
    `;
    const embed = new MessageEmbed()
        .setTitle('Tiempo finalizado:')
        .setColor('#00ff00')
        .setDescription(message)
        .setFooter({ text: (`TimerId: ${messageId}`)});
    interaction.channel.send({ embeds: [embed] });
}
export function send_timeDeleted (interaction, clientMessageId){
    const embed = new MessageEmbed()
        .setTitle('Un countdown menos en mis filas:')
        .setColor('##FFA233')
        .setDescription(`el timerId \` ${clientMessageId} \` se elimino correctamente.`);
    interaction.reply({ embeds: [embed] });
}
export function send_errClientMessageId (interaction, clientMessageId){
    const embed = new MessageEmbed()
        .setTitle('Eh fallado:')
        .setColor('##FFA233')
        .setDescription(`el timerId \` ${clientMessageId} \` enviado ya expiro o ne encuentra.`);
    interaction.reply({ embeds: [embed] });
}