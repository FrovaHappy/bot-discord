import { randomUUID } from "crypto";
import {
  send_OverflowValue,
  send_timeInit,
  send_timeFinish,
} from "./messages/timeOn.js";
import { BuilderTime } from "./utils/builderTime.js";
import { timeIds } from "../../../config.js";

export function timeOn(interaction, options) {
  const time = new BuilderTime(options.hours, options.mins);
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
