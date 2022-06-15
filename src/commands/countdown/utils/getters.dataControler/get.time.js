export class GetTime {
  #dataUser;
  #dataGuild;
  constructor(dataUser, dataGuild) {
    this.#dataUser = dataUser;
    this.#dataGuild = dataGuild;
    this.time = this.#builderTime();
  }
  #builderTime() {
    if (this.#dataGuild.hours || this.#dataGuild.mins) {
      return {
        hours: this.#dataGuild.hours,
        mins: this.#dataGuild.mins,
      };
    }
    if (this.#dataUser.hours || this.#dataUser.mins) {
      return {
        hours: this.#dataUser.hours,
        mins: this.#dataUser.mins,
      };
    }
    return {
      hours: 2,
      mins: 0,
    };
  }
}
