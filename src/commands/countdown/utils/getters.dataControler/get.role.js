export class GetRole {
  #dataUser;
  #dataGuild;
  constructor(dataUser, dataGuild) {
    this.#dataUser = dataUser;
    this.#dataGuild = dataGuild;
    this.role = this.#builderRole();
  }
  #builderRole() {
    if (this.#dataGuild.role) {
      return {
        type: "admin",
        id: this.#dataGuild.role,
        mention: this.#dataUser.mention,
      };
    }
    if (this.#dataUser.mention) {
      return {
        type: "user",
        id: "",
        mention: this.#dataUser.mention
      };
    }
    return {
        type: "default",
        id: "",
        mention: this.#dataUser.mention,
    }
  }
};
