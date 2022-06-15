import { CountdownQuery } from "../../../database/countdown.js";
import { GetTime } from "./getters.dataControler/get.time.js";

export class DataControler {
  #dataUser;
  #interaction;
  constructor(interaction, options) {
    this.#interaction = interaction;
    this.#dataUser = options;
    this.user = interaction.user;
  }
  async getData(){
    const dataGuild = new CountdownQuery(this.#interaction);
    await dataGuild.getData()
    const getTime = new GetTime(this.#dataUser, dataGuild.data);
    
    this.time = getTime.time;
    return this;
  }
}
