export function builderContent(data) {
  let filteredData = isCustomForUser(data);
  let content = "Que hermoso dia no? <role:?>";
  if (data.role.type === "user") return content.replace("<role:?>", "<user:id>");
  if (filteredData) return content.replace("<role:?>", "");
  if (data.role.type === "admin") return content.replace("<role:?>", "<role:id>");
  if (data.role.type === "default") return content.replace("<role:?>", "");
  return content;
}

function isCustomForUser(data) {
  let isCustom = false;
  const arrayOfKeys = Object.keys(data);
  arrayOfKeys.map((key) => {
    if (data[key].type === "user") isCustom = true;
  });
  console.log(isCustom);
  return isCustom;
}
