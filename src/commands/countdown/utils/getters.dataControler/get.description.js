export class GetDescription {
  #dataUser;
  #dataGuild;
  constructor(dataUser, dataGuild) {
    this.#dataUser = dataUser;
    this.#dataGuild = dataGuild;
    this.description = this.#builderDescription();
  }
  #builderDescription() {
    if (this.#dataGuild.description) {
      return {
        type: "admin",
        content: this.#dataGuild.description,
      };
    }
    if (this.#dataUser.description) {
      return {
        type: "user",
        content: this.#dataUser.description,
      };
    }
    return {
      type: "default",
      content: `
        ¡Después de una larga espera, llega el momento!
        <user:id> ¿quieres casarte conmigo?
      `,
    };
  }
}
