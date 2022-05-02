import { MessageEmbed } from 'discord.js';

export function OverflowValue(interaction){
    const response = new MessageEmbed()
        .setColor('#FFA233')
        .setDescription(`El tiempo es mayo a las \` 6 hs.\` ` /n `Tiempo introducido: \` ${time.hours} hs ${time.mins} mins \``);
    return response;
}
export function messageOk (interaction, time, messageId){
    const response = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`el mensaje se enviara en \` ${time.hours} hs ${time.mins} mins \``)
        .setFooter({ text: (`TimerId: ${messageId}`)});
    return response
}

export function errMessageId (interaction, messageId){
    const response = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`el timerId \` ${messageId} \` enviado ya expiro o ne encuentra.`)
    return response
}