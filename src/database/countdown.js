import { countdownModel } from "./model/countdown.js";

export class CountdownQuery {
  #guild;
  constructor(interaction) {
    this.interaction = interaction;
    this.#guild = this.interaction.guildId;
  }

  async getData() {
    const query = await countdownModel.findOne({ guild: this.#guild });
    return query;
  }
  async setData(data = {}) {
    const update = {};
    if (data.description) update.description = data.description;
    if (data.role) update.role = data.role;

    const query = await countdownModel.findOneAndUpdate(
      { guild: this.#guild },
      update,
      { upsert: true, strict: true, returnDocument: 'after'},
    );
    return query;
  }
}
