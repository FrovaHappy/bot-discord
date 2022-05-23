import {randomUUID} from 'crypto'
import { 
    send_OverflowValue, 
    send_timeInit,
    send_timeFinish
} from './messages/timeOn.js';

import { timeIds } from '../../../config.js';

export function timeOn(interaction, hours,mins){
    let time = getTime(hours,mins);
    if(time.time > time.timeLimit) {
        send_OverflowValue(interaction,time);
        return
    };
    const messageId = randomUUID();
    const timeId = startSetTimeout(interaction, time, messageId);
    timeIds.set(messageId, timeId);

    send_timeInit(interaction,time,messageId);
}

function getTime (hours,mins) {
    let timeDefault = 2 * 3600; //time in second
    const timeLimit = 6 * 3600 * 1000; // time in hours
    hours = (hours === null) ? 0 : hours
    mins = (mins===null) ? 0 : mins
    
    const sum = (hours * 3600) + (mins * 60) //time in seconds
    const time = (sum === 0)? (timeDefault * 1000) : (sum * 1000) //time in milliseconds
    
    return {
        time: time,
        timeLimit: timeLimit,
        hours: (sum===0? timeDefault/3600 : hours),
        mins: mins
    }
}
function startSetTimeout(interaction, time, messageId){
    let rest = setTimeout(function () {
        timeIds.delete(messageId);
        send_timeFinish(interaction,messageId);
    }, time.time);
    return rest
}
