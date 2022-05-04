import {
    send_errClientMessageId,
    send_timeDeleted
} from './embeds.js'
import {timeIds} from '../../config.js'

export function timeOff (interaction,clientMessageId){
    if (!timeIds.has(clientMessageId)){
        send_errClientMessageId(interaction,clientMessageId);
        return
    };
    
    clearTimeout(timeIds.get(clientMessageId));
    timeIds.delete(clientMessageId);
    send_timeDeleted(interaction,clientMessageId);
}