import {randomUUID} from 'crypto'
import { messageOk } from './embeds.js';
import { timeIds } from '../../config.js';

export function timeOn(interaction, hours,mins){
    let time = getTime(hours,mins);
    
    if(time.time > (6 * 3600 * 1000)) {
        interaction.reply('tiempo excedido');
        return
    };
    const messageId = randomUUID();
    
    interaction.reply({ embeds: [messageOk(interaction,time,messageId)] });
    const timeId = startSetTimeout(interaction, time, messageId);
    
    timeIds.set(messageId, timeId);
    console.log('a new message: ',timeIds.keys());

}

function getTime (hours,mins) {
    let timeDefault = 2 * 3600; //time in second
    hours = (hours === null) ? 0 : hours
    mins = (mins===null) ? 0 : mins
    
    const sum = (hours * 3600) + (mins * 60) //time in seconds
    const time = (sum === 0)? (timeDefault * 1000) : (sum * 1000) //time in milliseconds
    
    return {
        time: time,
        hours: (sum===0? timeDefault/3600 : hours),
        mins: mins
    }
}
function startSetTimeout(interaction, time, messageId){
    let rest = setTimeout(function () {
        interaction.channel.send('setTimeout finished.');
        timeIds.delete(messageId);
        console.log(' a message send :',timeIds.keys());
        console.log(timeIds.has(messageId))
    }, time.time);
    return rest
}
