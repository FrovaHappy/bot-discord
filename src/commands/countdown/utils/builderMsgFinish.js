export class BuilderMngFinish {
  constructor(options, queryProperties) {
    this.options = options;
    this.queryProperties = queryProperties;
    this.content = this.#builderContent();
    this.description = this.#builderDescriptionEmbed();
  }
  #builderContent() {
    let content = "Que hermoso dia no? ";;
    if (this.options.mention) 
      content += `<@${this.options.role}>`;
    if (this.queryProperties.role)
      content += `<@${this.queryProperties.role}>`;
    return content;
  }
  #builderDescriptionEmbed() {
    let description = `
      ¡Después de una larga espera, llega el momento!
      <@${this.options.role}> ¿quieres casarte conmigo?
    `;
    if (this.queryProperties.description)
      description = `${this.queryProperties.description}`;
    if (this.options.description) 
      description = `${this.options.description}`;
    return description;
  }
}
