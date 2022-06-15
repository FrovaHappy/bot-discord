import { randomUUID } from "crypto";
import {
  send_OverflowValue,
  send_timeInit,
  send_timeFinish,
} from "./messages/timeOn.js";
import { BuilderTime } from "./utils/builderTime.js";
import { timeIds } from "../../../config.js";
import { DataControler } from "./utils/dataControler.js";

export async function timeOn(interaction, options) {
  let dataControler =  new DataControler(interaction, options);
  await dataControler.getData();
  console.log(dataControler);
  const time = new BuilderTime(dataControler.time.hours, dataControler.time.mins);
  console.log(options);
  if (time.isInvalidTime()) {
    send_OverflowValue(interaction, time);
    return;
  }
  const messageId = randomUUID();
  const timeOut = startSetTimeout(interaction, time, messageId, options);
  timeIds.set(messageId, timeOut);
  send_timeInit(interaction, time, messageId);
}
function startSetTimeout(interaction, time, messageId, options) {
  let rest = setTimeout(()=> {
    timeIds.delete(messageId);
    send_timeFinish(interaction, options, messageId);
  }, time.totalTime);
  return rest;
}
