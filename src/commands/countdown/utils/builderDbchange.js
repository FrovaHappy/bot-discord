export function buildersDbChange(countdownQuery) {
  const hasUpdated = countdownQuery.hasUpdated;
  const data = countdownQuery.data;
  const change = Object.keys(keysIgnore(hasUpdated));
  let result = ``;
  if (change.length) {
    result = "> creo que estoy vacio.";
    return result;
  }
  for (const key of change) {
    if (hasUpdated[key])
      result += `> :white_medium_small_square: ${key}: \`${data[key]}\` \n`;
    else result += `> :black_medium_small_square: ${key}: \`${data[key]}\` \n`;
  }
  return result;
}
function keysIgnore(hasUpdated) {
  const ignore = ["_id", "guild", "__v", "createdAt", "updatedAt"];
  for (const key of ignore) {
    delete hasUpdated[key];
  }
  return hasUpdated;
}
