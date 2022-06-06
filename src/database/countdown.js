import { countdownModel } from "./model/countdown.js";

export class CountdownQuery {
  #guild;
  constructor(interaction) {
    this.#guild = interaction.guildId;
    this.valuesUpdated = 0;
    this.hasUpdated = {};
    this.data = {}
  }

  async getData() {
    const query = await countdownModel.findOne({ guild: this.#guild });
    return query || {};
  }
  async setData(options = {}) {
    const update = this.#buildersUpdate(options);
    const query = await countdownModel.findOneAndUpdate(
      { guild: this.#guild },
      update,
      { upsert: true, strict: true, returnDocument: "after" },
    );

    this.data = query;
    this.valuesUpdated = Object.values(update).length;
    this.hasUpdated = this.#hasUpdated(query, update);
    return this;
  }
  #buildersUpdate(options) {
    let result = {};

    if (options.setDescription) result.description = options.setDescription;
    if (options.setRole) result.role = options.setRole.id;
    if (options.setHours) result.hours = options.setHours;
    if (options.setMins) result.mins = options.setMins;

    return result;
  }
  #hasUpdated(query, update) {
    let result = {};
    const keys = Object.keys(query._doc);
    console.log(keys);
    for (const key of keys) {
      if (update[key]) result[key] = true;
      else result[key] = false;
    }
    return result;
  }
}
