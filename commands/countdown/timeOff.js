import {errMessageId} from './embeds.js'
import {timeIds} from '../../config.js'

export function timeOff (interaction,messageId){
    if (!timeIds.has(messageId)){
        interaction.reply({ embeds :[errMessageId(interaction,messageId)]});
        return
    };
    
    clearTimeout(timeIds.get(messageId));
    timeIds.delete(messageId)
    interaction.reply('eliminado con exito.')
    console.log('a message delete: ',timeIds.keys());
}