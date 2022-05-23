import {
    send_errClientMessageId,
    send_timeDeleted
} from './messages/timeDeleted.js'
import {timeIds} from '../../../config.js'

export function timeOff (interaction){
    const text = interaction.message.embeds[0].footer.text;
	const clientMessageId = text.split(' ')[1];
    
    if (!timeIds.has(clientMessageId)){
        send_errClientMessageId(interaction,clientMessageId);
        return
    };
    
    clearTimeout(timeIds.get(clientMessageId));
    timeIds.delete(clientMessageId);
    send_timeDeleted(interaction,clientMessageId);
}