export function formattingText(data, formattedText = []) {
  let result = [];
  formattedText.map(arrayElement => {
    let toformat = JSON.stringify(arrayElement);
    toformat = toformat
      .replace("<user:id>", `<@${data.user.id}>`)
      .replace("<role:id>", `<@&${data.role.id}>`);
    result.push(JSON.parse(toformat));
  });
  return result;
}
